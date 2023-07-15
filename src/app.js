require("dotenv").config({ path: "environment.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:4200")
    res.header("Access-Control-Allow-Headers", "Authorization")
    res.header("Access-Control-Allow-Methods", 'GET,PATCH,POST,DELETE');
    app.use(cors());
    next();
});
app.use("/api", routes);
app.listen(process.env.PORT, () => {
    console.log(`servidor rodando em: http://localhost:${process.env.PORT}`);
});
