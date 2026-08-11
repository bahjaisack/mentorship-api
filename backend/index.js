import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import path from 'path';
import { fileURLToPath } from "url";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utility/swagger.js";
import { limiter } from "./middlewares/rateLimit.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173"]
  }),
);
app.use(limiter);

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
// app.use(logger)

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/api/health", (req, res) => {
  res.json("server is working...😊");
});

// app.get("/users/:id", (req, res) => {
//   const user = users.find((u) => u.id == req.params.id);
//   if (!user) return res.status(404).send("user not found");
//   res.json(user);
// });

// app.post("/users", (req, res) => {
//   const newuser = {
//     id: users.length + 1,
//     name: req.body.name,
//   };
//   users.push(newuser);
//   res.status(201).json(newuser);
// });

// app.put("/users/:id", (req, res) => {
//   const user = users.find((u) => u.id == req.params.id);
//   if (!user) return res.status(404).send("user not found");
//   user.name = req.body.name;
//   res.json(user);
//   res.send(`user with ${userId} was updated`);
// });

// app.delete("/users/:id", (req, res) => {
//   users = users.filter((u) => u.id != req.params.id);
//   res.send(`user deleted`);
// });

// server frontend in production

if(process.env.NODE_ENV === "production") {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  // server frontend
  app.get(/.*/, (req, res)=>{
    res.send(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
  })
}


app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(
    process.env.NODE_ENV == "development"
      ? process.env.MONGO_URI_DEV
      : process.env.MONGO_URI_PRO,
  )
  .then(() => console.log("✅ connected to mongo db"))
  .catch((error) => console.log("❌ connection failed", error));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
