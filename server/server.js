import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

// ✅ CORS middleware सबसे ऊपर होना चाहिए
const allowedOrigins = [
  'http://localhost:5173',
  'https://buy-it-iota.vercel.app',
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// ✅ Express को OPTIONS requests handle करने दो
app.options('*', cors());

// Stripe webhook को raw body चाहिए
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// बाकी middlewares अब लगाओ
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send('API is Working'));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
