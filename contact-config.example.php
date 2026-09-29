<?php
// SMTP settings for public/contact-mail.php.
//
// 1. Copy this file to contact-config.php and fill in the values.
// 2. On Hostinger, upload contact-config.php ONE FOLDER ABOVE public_html
//    (e.g. /home/<user>/domains/samratglobalindia.com/contact-config.php),
//    so it can never be opened in a browser.
// 3. Never commit contact-config.php (it is in .gitignore).
//
// Common servers:
//   Gmail / Google Workspace  smtp.gmail.com      465  (16-character App Password)
//   Hostinger email           smtp.hostinger.com  465  (the mailbox's own password)
//   GoDaddy / Microsoft 365   smtp.office365.com  587
return [
    'host' => 'smtp.gmail.com',
    'port' => 465,
    'user' => 'you@example.com',
    'pass' => '',
    // where enquiries are delivered (defaults to 'user')
    'to'   => 'you@example.com',
];
