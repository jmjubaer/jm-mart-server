const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.send("Jm Mart server Running ........");
});
app.listen(port, () => {
    console.log("Jm Mart server running on port", port);
});




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mdjubaerm16247:jubaer12islam@cluster0.wxf5f5n.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    
    const usersCollection = await client.db("jm-mert").collection('users')
    
    
    
  
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
