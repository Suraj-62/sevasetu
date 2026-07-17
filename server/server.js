const express = require('express');
const dotenv = require('dotenv');

// Load env vars first so required modules have access to them
dotenv.config();

const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL // Vercel production URL
];

// Connect to database
connectDB();

const app = express();

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
// Apply the rate limiting middleware to API calls only
app.use('/api/', apiLimiter);

// Middleware
app.use(express.json());
app.use(cors({ origin: allowedOrigins }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_booking_room', (bookingId) => {
    socket.join(bookingId);
    console.log(`User joined room: ${bookingId}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.bookingId).emit('receive_message', data);
  });

  socket.on('update_location', (data) => {
    socket.to(data.bookingId).emit('location_updated', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server & Socket.io running on port ${PORT}`);
});
