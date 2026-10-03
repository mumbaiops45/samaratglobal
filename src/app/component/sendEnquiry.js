import emailjs from "@emailjs/browser";

// Sends the Contact and Request-a-Quote forms through EmailJS, straight from
// the browser, so it works on any host (static Hostinger export or Vercel).
//
// EmailJS account ids. These are public by design (they ship in the browser
// bundle anyway), so they live here and no .env file is needed on any host.
const SERVICE_ID = "service_pklyrv6";
const TEMPLATE_ID = "template_y3r7go5";
const PUBLIC_KEY = "tStv7JwZFWsbJU2Cf";

// Both forms share one EmailJS template ("Customer Inquiry Form"), which has a
// slot for first name, last name, email, phone, subject and message. Each
// value is sent under the usual spellings of its variable name so the
// template's {{...}} placeholders are filled whichever one it uses.
export const sendEnquiry = ({ firstName, lastName, email, phone, subject, message }) =>
  emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      firstName, first_name: firstName, firstname: firstName,
      lastName, last_name: lastName, lastname: lastName,
      name: [firstName, lastName].filter(Boolean).join(" "),
      email,
      phone,
      subject, inquiry_subject: subject, title: subject,
      message,
    },
    { publicKey: PUBLIC_KEY }
  );
