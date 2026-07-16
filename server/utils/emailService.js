const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendRegistrationEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: `"SevaSetu Admin" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: 'Welcome to SevaSetu! Registration Successful',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #4F46E5;">Thank you for registering in SevaSetu, ${userName}!</h2>
        <p>Your registration as a Service Provider / Vendor is currently <strong>under review</strong>.</p>
        <p>Our Super Admin will verify your documents and approve your account. The verification process usually takes around <strong>12 hours</strong>.</p>
        <p>You will receive another email once your verification is complete.</p>
        <br />
        <p>Best regards,<br/>The SevaSetu Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Registration email sent to ${userEmail}`);
  } catch (error) {
    console.error(`Error sending registration email to ${userEmail}:`, error);
  }
};

const sendApprovalEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: `"SevaSetu Admin" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: 'Verification Complete - Welcome to SevaSetu!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #10B981;">Verification Complete! 🎉</h2>
        <p>Hello ${userName},</p>
        <p>Congratulations! Your account has been verified and approved by the Super Admin.</p>
        <p>You can now access your dashboard and start accepting jobs.</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Your Login ID:</strong> ${userEmail}</p>
          <p style="margin: 5px 0 0 0;"><strong>Password:</strong> <i>The password you created during registration</i></p>
        </div>
        <a href="http://localhost:5173/login" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Login to Dashboard</a>
        <br /><br />
        <p>Best regards,<br/>The SevaSetu Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Approval email sent to ${userEmail}`);
  } catch (error) {
    console.error(`Error sending approval email to ${userEmail}:`, error);
  }
};

module.exports = {
  sendRegistrationEmail,
  sendApprovalEmail,
};
