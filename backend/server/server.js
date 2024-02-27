const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
let cors = require('cors')
app.use(cors());
app.use(express.json());

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hallo wereld!");
});

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c5a20bc4a6a1da",
    pass: "2868e3d03790bc"
  }
});


app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // Compose email message
  const mailOptions = {
      from: '"Your Name" <yourusername@example.com>',
      to: 'recipient@example.com',
      subject: 'Form Submission',
      text: `Form data:\n${JSON.stringify(formData, null, 2)}`
  };

  // Send email
  transport.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Error sending email');
      } else {
          console.log('Email sent:', info.response);
          res.status(200).send('Email sent successfully');
      }
  });
});

app.listen(port, () => console.log(`Data API listening on port ${port}!`))
