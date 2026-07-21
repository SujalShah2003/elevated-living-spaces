type ContactEmailData = {
  name: string;
  email: string;
  date: string;
  message: string;
};

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]!,
  );

const formatTourDate = (date: string) =>
  new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T12:00:00`));

export function buildContactEmailText({ name, email, date, message }: ContactEmailData) {
  return [
    "MAISON RIVE",
    "New private tour request",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Preferred date: ${formatTourDate(date)}`,
    "",
    "Message:",
    message,
    "",
    "Reply directly to this email to contact the prospective resident.",
  ].join("\n");
}

export function buildContactEmailHtml({ name, email, date, message }: ContactEmailData) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeDate = escapeHtml(formatTourDate(date));
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: Your Maison Rive tour request`,
  )}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Maison Rive tour request</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f0e9;color:#292724;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      New private tour request from ${safeName} for ${safeDate}.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f0e9;">
      <tr>
        <td align="center" style="padding:36px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#fffdf9;border:1px solid #e4dfd4;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:28px 36px;background:#252522;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td width="48" valign="middle">
                      <div style="width:42px;height:42px;line-height:42px;text-align:center;border-radius:50%;background:#a9bca5;color:#252522;font-family:Georgia,serif;font-size:20px;font-weight:bold;">M</div>
                    </td>
                    <td valign="middle" style="padding-left:12px;color:#ffffff;font-family:Georgia,serif;font-size:22px;letter-spacing:.3px;">Maison Rive</td>
                    <td align="right" valign="middle" style="color:#c9c6bf;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;">Tour request</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:42px 36px 14px;">
                <div style="margin-bottom:12px;color:#70816d;font-size:12px;font-weight:bold;letter-spacing:1.8px;text-transform:uppercase;">A new prospective resident</div>
                <h1 style="margin:0;color:#292724;font-family:Georgia,serif;font-size:36px;font-weight:normal;line-height:1.15;">A private tour has<br>been requested.</h1>
                <p style="margin:18px 0 0;color:#6d6962;font-size:16px;line-height:1.65;">${safeName} would like to visit Maison Rive. Their preferred details are below.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 36px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f2eb;border-radius:16px;">
                  <tr>
                    <td style="padding:22px 24px;border-bottom:1px solid #e2ddd2;color:#777168;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Name</td>
                    <td align="right" style="padding:22px 24px;border-bottom:1px solid #e2ddd2;color:#292724;font-size:15px;font-weight:bold;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:22px 24px;border-bottom:1px solid #e2ddd2;color:#777168;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Email</td>
                    <td align="right" style="padding:22px 24px;border-bottom:1px solid #e2ddd2;font-size:15px;"><a href="mailto:${safeEmail}" style="color:#526a50;text-decoration:none;">${safeEmail}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:22px 24px;color:#777168;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Preferred date</td>
                    <td align="right" style="padding:22px 24px;color:#292724;font-size:15px;font-weight:bold;">${safeDate}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 36px 8px;">
                <div style="margin-bottom:10px;color:#777168;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Message</div>
                <div style="padding:20px 22px;border-left:3px solid #9caf98;background:#faf8f3;color:#45413c;font-size:15px;line-height:1.7;">${safeMessage}</div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:28px 36px 44px;">
                <a href="${replyHref}" style="display:inline-block;padding:15px 28px;border-radius:999px;background:#252522;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;">Reply to ${safeName}</a>
                <p style="margin:16px 0 0;color:#89847c;font-size:12px;line-height:1.5;">Replying to this email will also respond directly to ${safeEmail}.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:22px 30px;border-top:1px solid #e8e3d9;color:#969088;font-size:11px;line-height:1.6;">
                Maison Rive · Private tours available seven days a week<br>
                This notification was sent from the Maison Rive website.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
