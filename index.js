const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
// const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
      return res.status(401).send({ message: "Unauthorize access" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.VITE_TOKEN, (err, decoded) => {
      if (err) {
          return res.status(403).send({ message: "Forbidden access" });
      } else {
          req.decoded = decoded;
          next();
      }
  });
};

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
    
// DB Collection list 
    const usersCollection = client.db("jm-mert").collection('users')
    const productsCollection = client.db("jm-mert").collection('products')
    

//Verify related API
        app.post("/jwt", async (req, res) => {
          const user = req.body;
          const token = jwt.sign(user, process.env.VITE_TOKEN, {
              expiresIn: "1h",
          });
          res.send({ token });
      });

// User Api
    app.post("/user", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
          return res.send({ message: "User already exists" });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
  });

// Product Api
    
      app.get('/products', async(req, res) => {
        const result = await productsCollection.find().toArray();
        res.send(result);
      })
      
  
  // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
