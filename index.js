const express = require('express');

const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j0bnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function  run(){

    try{
        await client.connect()
       
        const database = client.db("tourism");
    const serviceCollection = database.collection("services");
    const orderCollection = database.collection('orders');

    // mongodb 

    // GET API
    app.get('/services', async (req, res) => {
        const cursor = serviceCollection.find({});
       
        const services = await cursor.toArray();
        console.log(services)
        res.send(services);
    });

//nodenmongo db get data

    // post api

    app.post('/addUser', async (req, res) => {
        const service = req.body;
        console.log('hit the post api', service);

        const result = await serviceCollection.insertOne(service);
        console.log(result);
        res.json(result)
    });


// get all orders 
app.get('/allOrders', async (req, res) => {
    const cursor = orderCollection.find({});
   
    const services = await cursor.toArray();
    console.log(services)
    res.send(services);
});



//    post all orders 
app.post('/orders', async (req, res) => {
    const order = req.body;
    const result = await orderCollection.insertOne(order);
    res.json(result);
})

    }
finally{

}

}

run().catch(console.dir)



app.get('/',(req,res)=>{
res.send('welcom to tourism dabase')
})



app.listen(port, () => {
    console.log('Running Genius Server on port', port);
})