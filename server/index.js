import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Coffee server is being kept warm.");
});

app.listen(port, () => {
  console.log(`Coffee server is running on port, ${port}`);
});
