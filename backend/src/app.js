const express = require("express");
const cors = require("cors");
const datasetRoutes = require(
  "./routes/datasetRoutes"
);
const errorHandler = require("./middleware/errorHandler");
const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", datasetRoutes);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});
app.use(errorHandler);

module.exports = app;