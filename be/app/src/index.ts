import express from "express";
import cors from "cors";

const app = express();
const port: number = process.env.PORT as any as number;
app.use(cors());
app.get("/", (req, res) => {
  const text = JSON.stringify("Hello world!");
  res.send(text);
});

app.listen(port, "localhost", 511, () => {
  console.log(`Server is listening on port ${port}`);
});
