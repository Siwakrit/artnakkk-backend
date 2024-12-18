import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//App config
const app = express();
const port = process.env.PORT || 4000;


//Service connections
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
//Define the list of allowed origins
const allowedOrigins = [
  "https://artnakkk-admin.vercel.app",
  "https://artnakkk-admin-siwakrit-pattaveesins-projects.vercel.app",
  "https://artnakkk-frontend-siwakrit-pattaveesins-projects.vercel.app",
  "https://artnakkk-frontend-five.vercel.app",
  "https://artnakkk-frontend-user-main.vercel.app",
  "https://artnakkk-frontend-use-git-eafd5b-siwakrit-pattaveesins-projects.vercel.app",
  "http://localhost:5173", // For local development
  "http://localhost:5174", // For local development
  "http://localhost:5175", // For local development
  "http://localhost:5176", // For local development
];

// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Block the origin
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies or Authorization headers
  })
);

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () =>
  console.log("Server started on PORT :" + port + "🌏 🙌")
);