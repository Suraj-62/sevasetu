require('dotenv').config();
const { sendRegistrationEmail } = require('./utils/emailService');

const test = async () => {
  console.log('Sending test email...');
  await sendRegistrationEmail('mishrasuraj@gmail.com', 'Test User');
  console.log('Done');
};

test();
