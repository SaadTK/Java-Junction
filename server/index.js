import express from "express";
import cors from "cors";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 3000;

// app.use(dotenv.config())
dotenv.config();
app.use(cors());
app.use(express.json());

// tahmidkarimsaad: elzvSla5PeVYcmmO

// mongoDB part start

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@jjcluster.12jkxtp.mongodb.net/?retryWrites=true&w=majority&appName=JJCluster`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rwhryrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    await client.connect();

    const coffeesCollection = client.db("coffeeDB").collection("coffees");

    //               routes to db start

    //update a coffee
    app.put("/all-coffees/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedCoffee = req.body;
      const updateDoc = {
        $set: updatedCoffee,
      };
      const result = await coffeesCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    //get a single coffee
    app.get("/all-coffees/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeesCollection.findOne(query);
      res.send(result);
    });

    // delete a coffee
    app.delete("/all-coffees/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeesCollection.deleteOne(query);
      res.send(result);
    });
    // get coffee to display
    app.get("/all-coffees", async (req, res) => {
      const result = await coffeesCollection.find().toArray();
      res.send(result);
    });

    //add a new coffee
    app.post("/new-coffee", async (req, res) => {
      const newCoffee = req.body;
      console.log(newCoffee);

      const result = await coffeesCollection.insertOne(newCoffee);
      res.send(result);
    });

    //              routes to db end

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
