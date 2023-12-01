const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


//Middle Wares
app.use(cors({
  origin: [
    // 'http://localhost:5173', 'http://localhost:5174'
    'https://luxbeachresort.netlify.app',
    'https://luxehaven-resort.web.app'
  ],
  credentials: true
}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());




const username = process.env.db_user
const password = process.env.db_pass;
console.log("User + Pass", username, password);


const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.jip67yo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middle Ware
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
  jwt.verify(token, process.env.access_token_secret, (err, decoded) =>{
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



    const userCollection = client.db("hotelBooking").collection("user");
    const roomsCollection = client.db("hotelBooking").collection("rooms");
    const bookingsCollection = client.db("hotelBooking").collection("bookings");
    const blogsCollection = client.db("hotelBooking").collection("blogs");


    //Auth Related API
    // Auth related API
    app.post('/jwt', logger,  async(req, res) =>{
      const user = req.body;
      console.log(user);
      const token = jwt.sign(user, process.env.access_token_secret, {expiresIn: '1h'});
      console.log(token);

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none', //http://localhost:5173/login
      }).send({success: true});
    })



    //Logout
    app.post('/logout', async (req, res) => {
      const user = req.body;
      console.log('logging out', user);
      res.clearCookie('token', { maxAge: 0 }).send({ success: true })
    })



    // Rooms Related APi
      app.get('/rooms', async(req, res) =>{
        const cursor = roomsCollection.find();
        const result =  await cursor.toArray();
        res.send(result);
      });
  
  
      app.get('/rooms/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await roomsCollection.findOne(query)
        res.send(result)
      })


    
      



    app.post('/bookings', async (req, res) => {
    const bookingData = req.body;

    // Check if the user has overlapping bookings for the same room
    const overlappingBooking = await bookingsCollection.findOne({
        roomId: bookingData.roomId,
        email: bookingData.email,
        $or: [
            {
                checkIn: { $lt: bookingData.checkOut },
                checkOut: { $gt: bookingData.checkIn },
            },
        ],
    });

    if (overlappingBooking) {
        return res.status(400).send({ message: 'User has overlapping bookings for this room' });
    }

    // Proceed with the new booking
    const result = await bookingsCollection.insertOne(bookingData);
    res.send(result);
    });





    app.get('/bookings', logger, verifyToken, async (req, res) => {
      console.log(req.query.email);
      console.log('token owner info', req.user)
      if(req.user.email !== req.query.email){
          return res.status(403).send({message: 'forbidden access'})
      }
      let query = {};
      if (req.query?.email) {
          query = { email: req.query.email }
      }

      

      const result = await bookingsCollection.find(query).toArray();
      res.send(result);
    });


  


    app.delete('/bookings/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await bookingsCollection.deleteOne(query);
      res.send(result);
    })
  


    // Review Related APiI
    app.post('/rooms/:id/reviews', async (req, res) => {
      const roomId = req.params.id;
      const {yourName, reviewText, rating, userId } = req.body; // Assuming these are the parameters sent from the client
    
      try {
        // Store the review in the MongoDB collection associated with the room
        const roomReviewsCollection = client.db("hotelBooking").collection(`room_${roomId}_reviews`);
        await roomReviewsCollection.insertOne({yourName, reviewText, rating, userId });
    
        res.status(201).json({ message: 'Review submitted successfully' });
      } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ message: 'Failed to submit review' });
      }
    });



    app.get('/rooms/:id/reviews', async (req, res) => {
      const roomId = req.params.id;
      try {
        const roomReviewsCollection = client.db("hotelBooking").collection(`room_${roomId}_reviews`);
        const reviews = await roomReviewsCollection.find().toArray();
    
        if (reviews.length === 0) {
          res.status(200).json({ message: 'No reviews yet' });
        } else {
          res.status(200).json(reviews);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Failed to fetch reviews' });
      }
    });




    //Comments Related ApI

    app.post('/blogs/:id/comment', async (req, res) => {
      const roomId = req.params.id;
      const {commentText, name, email, userId } = req.body; // Assuming these are the parameters sent from the client
    
      try {
        // Store the review in the MongoDB collection associated with the room
        const blogCommentsCollection = client.db("hotelBooking").collection(`blog_${roomId}_comment`);
        await blogCommentsCollection.insertOne({commentText, name, email, userId });
    
        res.status(201).json({ message: 'Posted Comment  successfully' });
      } catch (error) {
        console.error('Error posting comment:', error);
        res.status(500).json({ message: 'Failed to post comment' });
      }
    });



    app.get('/blogs/:id/comment', async (req, res) => {
      const roomId = req.params.id;
      try {
        const blogCommentsCollection = client.db("hotelBooking").collection(`blog_${roomId}_comment`);
        const comment = await blogCommentsCollection.find().toArray();
    
        if (comment.length === 0) {
          res.status(200).json({ message: 'No Comments yet' });
        } else {
          res.status(200).json(comment);
        }
      } catch (error) {
        console.error('Error fetching commenitng:', error);
        res.status(500).json({ message: 'Failed to fetch post comment' });
      }
    });






    //Blogs Related Api
    app.get('/blogs', async(req, res) =>{
      const cursor = blogsCollection.find();
      const result =  await cursor.toArray();
      res.send(result);
    });


    app.get('/blogs/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await blogsCollection.findOne(query)
      res.send(result);
    })
    
      

    // User's Related API
      app.post('/users', async(req, res) =>{
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
    
        // // Extract the inserted document's _id
        const insertedId = result.insertedId;
    
        // Update the user document with the photo URL
        await userCollection.updateOne(
            { _id: insertedId },
            { $set: { photo: user.photo } }
        );
        console.log(user);
      });
  
    app.get('/users', async(req, res) =>{
        const cursor = userCollection.find();
        const users = await cursor.toArray();
        res.send(users);
    })




    // Send a ping to confirm a successful connection

    // Creating Collection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);













app.get('/', (req, res) =>{
    res.send("Hotel Booking Server is running");
});

app.listen(port, () =>{
    console.log(`Hotel Booking Server is running on port: ${port}`);
})