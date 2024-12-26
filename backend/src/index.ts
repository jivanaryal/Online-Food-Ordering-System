import express from "express";
import { AppDataSource } from "./data-source";
import customerRoutes from "./routes/customerRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/customer", customerRoutes);
app.use("/api/category", categoryRoutes);

// Initialize the database and start the server once the connection is established
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    // Start the server after the database connection is successful
    app.listen(5000, () => {
      console.log(`Server is running at port: 5000`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

// Global error handler for unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Global error handler for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception thrown:", error);
  process.exit(1); // Optionally exit on uncaught exception
});
