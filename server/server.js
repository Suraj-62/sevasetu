const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

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
    origin: '*',
    methods: ['GET', 'POST']
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

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server & Socket.io running on port ${PORT}`);
});
