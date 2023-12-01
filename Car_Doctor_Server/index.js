const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// Middle Wares
app.use(cors({
  origin: [
    'http://localhost:5173', 'http://localhost:5174'
    // 'https://carsdoctors-5251a.web.app',
    // 'https://carsdoctors-5251a.firebaseapp.com/'
  ],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());





console.log(process.env.db_user);
console.log(process.env.db_pass);

const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.jip67yo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// middlewares 
const logger = (req, res, next) =>{
  console.log('log: info', req.method, req.url);
  next();
}

const verifyToken = (req, res, next) =>{
  const token = req?.cookies?.token;
  // console.log('token in the middleware', token);
  // no token available 
  if(!token){
      return res.status(401).send({message: 'unauthorized access'})
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
      if(err){
          return res.status(401).send({message: 'unauthorized access'})
      }
      req.user = decoded;
      next();
  })
}




async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


        const serviceCollection = client.db('carsDoctor').collection('services');
        const ordersCollection = client.db('carsDoctor').collection('orders');


        // Auth related API
        app.post('/jwt', logger,  async(req, res) =>{
          const user = req.body;
          console.log(user);
          const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
          console.log(token);

          res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none', //http://localhost:5173/login
          }).send({success: true});
        })
        
        app.post('/logout', async (req, res) => {
          const user = req.body;
          console.log('logging out', user);
          res.clearCookie('token', { maxAge: 0 }).send({ success: true })
      })


     // services related api
     app.get('/services', logger,  async (req, res) => {
        const cursor = serviceCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })


    app.get('/services/:id', async(req, res) =>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = {
        projection: { title: 1, price: 1, service_id: 1, img: 1}
      }

      const result = await serviceCollection.findOne(query, options);
      res.send(result);
    })



    // Orders Realted API

    app.post('/orders', async(req, res) =>{
      const order = req.body;
      console.log(order);
      const result = await ordersCollection.insertOne(order);
      res.send(result)
    })

    // bookings 
    app.get('/orders', logger, verifyToken, async (req, res) => {
      console.log(req.query.email);
      console.log('token owner info', req.user)
      if(req.user.email !== req.query.email){
          return res.status(403).send({message: 'forbidden access'})
      }
      let query = {};
      if (req.query?.email) {
          query = { email: req.query.email }
      }
      const result = await ordersCollection.find(query).toArray();
      res.send(result);
    })

     
    app.patch('/orders/:id', async(req, res) =>{
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedOrders = req.body;
      console.log(updatedOrders);
      const updateDoc = {
        $set:{
          status: updatedOrders.status
        },
      };

      const result = await ordersCollection.updateOne(filter, updateDoc);
      res.send(result)

    })


  app.delete('/orders/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await ordersCollection.deleteOne(query);
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






app.get('/', (req, res) =>{
    res.send("Car doctor is running. hehhh")
})

app.listen(port, (req, res) =>{
    console.log(`Car doctor is Running on port : ${port}`);
})