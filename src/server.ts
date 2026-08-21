import express from "express";
import sequelize from "./config/database.js";
import "./models/index.js";
import authRoutes from "./routes/authroutes.js"
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import logger from "./utils/logger.js";

const app = express();

//middleware
//app.use(cors()); // this allows all origins to access all the available methods 

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE" ],
  allowedHeaders: [ "Content-Type", "Authorization"],
  credentials: true, // allows server to send the credentials associated with a method to the frontend
  maxAge: 86400   // time taken to preflight results for (put, delete) queries, which are complex queries
}

app.use(cors(corsOptions)); // it only allows for the defined attributes above
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the RABC");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    logger.info("Database connected.");

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to connect to database", { error });
  }
};

startServer();

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection", { error: err });
});