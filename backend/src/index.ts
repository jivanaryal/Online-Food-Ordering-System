import express from "express";
import { AppDataSource } from "./data-source";
import customerRoutes from "./routes/customerRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import menuItemRoutes from "./routes/menuItemRoutes";
import orderRoutes from "./routes/orderRoutes";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/customer", customerRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menuitem", menuItemRoutes);
app.use("/api/order", orderRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log(`Server is running at port: 3000`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception thrown:", error);
  process.exit(1);
});
