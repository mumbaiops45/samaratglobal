<?php
// Sends the website's Contact and Request-a-Quote forms over SMTP.
//
// The site is a static export hosted on Hostinger, which runs PHP but not
// Node.js, so this file (copied to the site root from /public at build time)
// replaces a server route. Both forms POST JSON here: { form: "contact" | "quote", ...fields }.
//
// Credentials live in contact-config.php, which is NOT in the repo. Upload it
// one folder ABOVE public_html so it can never be downloaded; see
// contact-config.example.php in the project root.

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function reply($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    reply(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$config = null;
foreach ([dirname(__DIR__) . '/contact-config.php', __DIR__ . '/contact-config.php'] as $path) {
    if (is_file($path)) { $config = require $path; break; }
}

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) reply(400, ['ok' => false, 'error' => 'Invalid request.']);

// Same fields and rules as the forms (src/app/contact/ContactPage.jsx and
// src/app/component/HomeSections.jsx) — the browser checks are only a convenience.
$NAME    = fn($v) => (bool) preg_match('/^(?=.{2,40}$)[a-zA-Z]+(?: [a-zA-Z]+)*$/', $v);
$EMAIL   = fn($v) => (bool) preg_match('/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/', $v);
$MESSAGE = fn($v) => strlen($v) >= 10 && strlen($v) <= 2000;

$FORMS = [
    'contact' => [
        'subject'  => 'New Trade Enquiry — Samrat Global India website',
        'required' => ['firstName', 'email', 'phone', 'subject', 'message'],
        'fields'   => [
            'firstName' => 'First name', 'lastName' => 'Last name', 'email' => 'Email',
            'phone' => 'Phone', 'subject' => 'Enquiry subject', 'message' => 'Message',
        ],
        'rules' => [
            'firstName' => $NAME, 'lastName' => $NAME, 'email' => $EMAIL,
            // 10-digit Indian mobile
            'phone' => fn($v) => (bool) preg_match('/^[6-9]\d{9}$/', $v),
            'message' => $MESSAGE,
        ],
    ],
    'quote' => [
        'subject'  => 'New Quote Request — Samrat Global India website',
        'required' => ['name', 'company', 'email', 'phone', 'enquiry', 'product', 'quantity', 'destination', 'message'],
        'fields'   => [
            'name' => 'Name', 'company' => 'Company', 'email' => 'Email', 'phone' => 'Phone / WhatsApp',
            'enquiry' => 'Enquiry type', 'product' => 'Product', 'quantity' => 'Quantity',
            'destination' => 'Destination', 'message' => 'Message',
        ],
        'rules' => [
            'name' => $NAME, 'email' => $EMAIL,
            // international: optional +, 7-15 digits with spaces/dashes/brackets
            'phone' => fn($v) => preg_match('/^\+?[\d\s()-]+$/', $v)
                && preg_match('/^\d{7,15}$/', preg_replace('/\D/', '', $v)),
            'message' => $MESSAGE,
        ],
    ],
];

$form = $FORMS[$body['form'] ?? ''] ?? null;
if (!$form) reply(400, ['ok' => false, 'error' => 'Unknown form.']);

// Hidden honeypot field: people never fill it, bots usually do. Pretend success.
if (!empty($body['_honey'])) reply(200, ['ok' => true]);

$values = [];
foreach ($form['fields'] as $key => $label) {
    $v = $body[$key] ?? '';
    $v = is_string($v) ? trim($v) : '';
    $values[$key] = function_exists('mb_substr') ? mb_substr($v, 0, 5000) : substr($v, 0, 5000);
}

foreach ($form['required'] as $key) {
    if ($values[$key] === '') reply(400, ['ok' => false, 'error' => $form['fields'][$key] . ' is required.']);
}
foreach ($form['rules'] as $key => $isValid) {
    if ($values[$key] !== '' && !$isValid($values[$key])) {
        reply(400, ['ok' => false, 'error' => 'Please check the ' . strtolower($form['fields'][$key]) . ' field.']);
    }
}

if (!$config || empty($config['host']) || empty($config['user']) || empty($config['pass'])) {
    error_log('contact-mail.php: contact-config.php missing or incomplete');
    reply(500, ['ok' => false, 'error' => 'Email is not configured.']);
}

// ---- build the message -------------------------------------------------------

$rowsText = [];
$rowsHtml = '';
foreach ($form['fields'] as $key => $label) {
    if ($values[$key] === '') continue;
    $rowsText[] = "$label: {$values[$key]}";
    $rowsHtml .= '<tr><th align="left" style="background:#EAF1FF;border:1px solid #d6e2f5;white-space:nowrap">'
        . htmlspecialchars($label) . '</th><td style="border:1px solid #d6e2f5;white-space:pre-wrap">'
        . htmlspecialchars($values[$key]) . '</td></tr>';
}
$html = '<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">'
    . $rowsHtml . '</table>';
$text = implode("\n", $rowsText);

$user    = $config['user'];
$to      = $config['to'] ?? $user;
$replyTo = $values['email']; // validated above, so no header injection
$boundary = 'b' . bin2hex(random_bytes(12));
$encode  = fn($s) => '=?UTF-8?B?' . base64_encode($s) . '?=';
$host    = parse_url('http://' . ($_SERVER['HTTP_HOST'] ?? 'localhost'), PHP_URL_HOST);

$message = implode("\r\n", [
    'Date: ' . date('r'),
    // Providers reject a From other than the login, so the visitor goes in Reply-To.
    'From: ' . $encode('Samrat Global India Website') . " <$user>",
    "To: <$to>",
    "Reply-To: <$replyTo>",
    'Subject: ' . $encode($form['subject']),
    'Message-ID: <' . bin2hex(random_bytes(16)) . "@$host>",
    'MIME-Version: 1.0',
    "Content-Type: multipart/alternative; boundary=\"$boundary\"",
    '',
    "--$boundary",
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    chunk_split(base64_encode($text)),
    "--$boundary",
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    chunk_split(base64_encode($html)),
    "--$boundary--",
    '',
]);

// ---- minimal SMTP client (SSL on 465, STARTTLS on 587) ----------------------

function smtp_send($config, $from, $to, $message) {
    $port = (int) ($config['port'] ?? 465);
    $ssl  = $port === 465;
    $sock = @stream_socket_client(($ssl ? 'ssl://' : 'tcp://') . $config['host'] . ":$port", $errno, $errstr, 20);
    if (!$sock) throw new Exception("connect failed: $errstr ($errno)");
    stream_set_timeout($sock, 20);

    // Reads one (possibly multi-line) reply and checks its status code.
    $expect = function ($code) use ($sock) {
        $reply = '';
        while (($line = fgets($sock, 1024)) !== false) {
            $reply .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        if ((int) substr($reply, 0, 3) !== $code) throw new Exception('SMTP: ' . trim($reply));
    };
    $cmd = function ($line, $code) use ($sock, $expect) {
        fwrite($sock, $line . "\r\n");
        $expect($code);
    };

    $me = gethostname() ?: 'localhost';
    $expect(220);
    $cmd("EHLO $me", 250);
    if (!$ssl) {
        $cmd('STARTTLS', 220);
        if (!stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            throw new Exception('STARTTLS failed');
        }
        $cmd("EHLO $me", 250);
    }
    $cmd('AUTH LOGIN', 334);
    $cmd(base64_encode($config['user']), 334);
    $cmd(base64_encode($config['pass']), 235);
    $cmd("MAIL FROM:<$from>", 250);
    $cmd("RCPT TO:<$to>", 250);
    $cmd('DATA', 354);
    // dot-stuffing: a line starting with "." must be doubled
    $data = preg_replace('/^\./m', '..', $message);
    $cmd($data . "\r\n.", 250);
    $cmd('QUIT', 221);
    fclose($sock);
}

try {
    smtp_send($config, $user, $to, $message);
    reply(200, ['ok' => true]);
} catch (Exception $e) {
    error_log('contact-mail.php: ' . $e->getMessage());
    reply(502, ['ok' => false, 'error' => 'Could not send your message.']);
}
