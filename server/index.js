import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 3000;

// app.use(dotenv.config())
dotenv.config();
app.use(cors());
app.use(express.json());

// tahmidkarimsaad: elzvSla5PeVYcmmO

// mongoDB part start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@jjcluster.12jkxtp.mongodb.net/?retryWrites=true&w=majority&appName=JJCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
    console.log("Finally I am on.");
  }
}
run().catch(console.dir);

// mongoDB part end

app.get("/", (req, res) => {
  res.send("Coffee server is being kept warm.");
});

app.listen(port, () => {
  console.log(`Coffee server is running on port, ${port}`);
});
