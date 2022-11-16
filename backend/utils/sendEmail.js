const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: "mobin17102@gmail.com",
      pass: "",
    },
  });

  const mailOptions = {
    from: "mobin17102@gmail.com",
    to: "mokarron.ice.ru@gmail.com",
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;