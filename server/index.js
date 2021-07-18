const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const route = require("./routes/router");

const connectDB = require("./database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3002;

app.use(morgan("tiny"));

connectDB();

app.use(bodyparser.json());

// load routers
app.use("/api", route);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
