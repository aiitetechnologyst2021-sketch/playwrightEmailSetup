const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

async function main() {
  const reportPath = path.join(__dirname, "playwright-report", "index.html");

  if (!fs.existsSync(reportPath)) {
    console.error("Playwright HTML report not found at", reportPath);
    process.exit(1);
  }

  const htmlContent = fs.readFileSync(reportPath, "utf-8");

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    REPORT_RECIPIENT,
    REPORT_SENDER,
    REPORT_SUBJECT
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !REPORT_RECIPIENT || !REPORT_SENDER) {
    console.error("Missing required SMTP or report environment variables");
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
  });

  const info = await transporter.sendMail({
    from: REPORT_SENDER,
    to: REPORT_RECIPIENT,
    subject: REPORT_SUBJECT || "Playwright Test Report",
    text: "Playwright HTML report is attached",
    attachments: [
      {
        filename: "playwright-report.html",
        content: htmlContent
      }
    ]
  });

  console.log("Report email sent", info.messageId);
}

main().catch(error => {
  console.error("Failed to send report email", error);
  process.exit(1);
});
