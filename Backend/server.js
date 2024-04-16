const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const ClientRoute = require("./Routes/ClientRoute.js");
const SupplierRoute = require("./Routes/SupplierRoute.js");
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
}) 
.catch((error) => {
  console.error(`Error connecting to MongoDB: ${error}`);
});

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/clients', ClientRoute);
app.use('/suppliers', SupplierRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
