import express from 'express';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes';
import authRoutes from './routes/authRoutes';
import commentRoutes from './routes/commentRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import announcementRoutes from './routes/announcementRoutes';
import registerRoutes from './routes/registerRoutes';
import summaryRoutes from './routes/summaryRoutes';
import advisorRoutes from './routes/advisorRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Define allowed origins for CORS
const allowedOrigins = ['http://localhost:5173']; // Replace with your frontend's URL if different

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true, // Allow cookies and credentials
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

app.use(express.json());
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/comments', commentRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/announcements', announcementRoutes);
app.use('/register', registerRoutes);
app.use('/summary', summaryRoutes);
app.use('/advisors', advisorRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});