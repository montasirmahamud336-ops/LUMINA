import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendWelcomeEmail = async (to: string, name: string) => {
  if (!process.env.SMTP_USER) {
    console.warn('SMTP not configured, skipping welcome email.');
    return;
  }

  const mailOptions = {
    from: `"Lumina Architecture" <${process.env.SMTP_USER}>`,
    to,
    subject: 'CONGRATULATIONS: Vision Signal Established',
    html: `
      <div style="background: #050505; color: #ffffff; padding: 40px; font-family: sans-serif;">
        <h1 style="color: #ea580c; text-transform: uppercase; letter-spacing: -1px;">Welcome to Lumina, ${name.toUpperCase()}</h1>
        <p style="color: #a3a3a3; line-height: 1.6;">Your vision signal has been successfully established on our neural network.</p>
        <p style="color: #a3a3a3; line-height: 1.6;">You now have access to our direct engineering channel and premium resource domain.</p>
        <div style="margin-top: 40px; padding: 20px; border: 1px solid #262626; border-radius: 12px; display: inline-block;">
          <a href="${process.env.APP_URL}/dashboard" style="color: #ffffff; text-decoration: none; font-weight: bold; text-transform: uppercase;">Access Dashboard</a>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${to}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export const sendAdminAlert = async (userName: string, userEmail: string) => {
  if (!process.env.SMTP_USER) return;

  const mailOptions = {
    from: `"Lumina System" <${process.env.SMTP_USER}>`,
    to: 'montasirmahamud336@gmail.com',
    subject: 'NEW SIGNAL DETECTED: New User Signup',
    html: `
      <div style="background: #050505; color: #ffffff; padding: 40px; font-family: sans-serif;">
        <h2 style="color: #2563eb; text-transform: uppercase;">New User Registered</h2>
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending admin alert:', error);
  }
};
