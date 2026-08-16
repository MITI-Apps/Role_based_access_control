import express from "express";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authroutes.js"

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database connected.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();