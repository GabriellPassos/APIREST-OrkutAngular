require("dotenv").config({ path: "environment.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:4200', 'https://gabriellpassos.github.io'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Methods", 'GET,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    app.use(cors());
    return next();
  });
app.use("/api", routes);
app.listen(process.env.PORT, () => {
    console.log(`servidor rodando em: http://localhost:${process.env.PORT}`);
});
