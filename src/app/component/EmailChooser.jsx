"use client";
import { useEffect, useState } from "react";
import { Check, Copy, Mail, X } from "lucide-react";

// On many laptops no mail app is set up, so clicking a mailto: link does
// nothing at all. This catches every mailto: click on a computer and offers
// webmail instead (Gmail / Outlook show their own sign-in page if the visitor
// isn't logged in), plus the mail app and a copy button. Phones keep the plain
// mailto: link, which opens their mail app directly.
const EmailChooser = () => {
  const [email, setEmail] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="mailto:"]');
      if (!link || link.dataset.mailApp) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      e.preventDefault();
      setCopied(false);
      setEmail(link.getAttribute("href").slice("mailto:".length).split("?")[0]);
    };
    const onKey = (e) => e.key === "Escape" && setEmail(null);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!email) return null;

  const to = encodeURIComponent(email);
  const close = () => setEmail(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // clipboard blocked: the address is shown above to select by hand
    }
  };
  const option =
    "flex w-full items-center gap-3 rounded-sm border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:bg-[#F4F9FF] hover:text-primary";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0A2540]/60 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Email us"
        className="w-full max-w-sm rounded-md bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1 flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold text-[#0A2540]">Email us</h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mr-2 -mt-2 rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-5 select-all break-all text-sm font-semibold text-primary">{email}</p>

        <div className="space-y-2">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${to}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className={option}
          >
            <Mail className="h-4 w-4 shrink-0" />
            Open in Gmail
          </a>
          <a
            href={`https://outlook.live.com/mail/0/deeplink/compose?to=${to}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className={option}
          >
            <Mail className="h-4 w-4 shrink-0" />
            Open in Outlook
          </a>
          <a href={`mailto:${email}`} data-mail-app="true" onClick={close} className={option}>
            <Mail className="h-4 w-4 shrink-0" />
            Open my mail app
          </a>
          <button type="button" onClick={copy} className={option}>
            {copied ? <Check className="h-4 w-4 shrink-0 text-emerald-600" /> : <Copy className="h-4 w-4 shrink-0" />}
            {copied ? "Email address copied" : "Copy email address"}
          </button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          Gmail and Outlook open in a new tab and ask you to sign in if you aren&apos;t already.
        </p>
      </div>
    </div>
  );
};

export default EmailChooser;
