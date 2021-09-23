import express from "express";
import routes from "./routes";

const app = express();
app.use(routes);

const PORT = 8081;
  
app.listen(PORT,() => {
    console.log(`Running on port ${PORT}`);
})