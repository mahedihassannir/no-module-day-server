const express = require("express")

const app = express()

const port = process.env.PORT || 5000

// import cors
const cors = require("cors")

// middlewir
app.use(cors())

// convert in json
app.use(express.json())

// dot env 
require("dotenv").config();


// here is the config of mongodb


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASS}@cluster0.obla9o6.mongodb.net/?retryWrites=true&w=majority`;

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
        await client.connect();

        const dbBase = client.db("postContainer").collection("postes")

        // here is making the url or coursor starts 

        app.get('/posts', async (req, res) => {

            const coursor = dbBase.find()

            const result = await coursor.toArray()

            res.send(result)

        })

        // here is making the url or coursor starts ends

        // =========================================

        // here is the delete method starts

        app.delete('/posts/:id', async (req, res) => {

            const id = req.params.id

            const query = { _id: new ObjectId(id) }

            const result = await dbBase.deleteOne(query)

            res.send(result)


        })



        // here is the delete method  ends

        // =========================================

        // post method starts

        app.post("/posts", async (req, res) => {

            let user = req.body
            console.log(user);

            const result = await dbBase.insertOne(user)

            res.send(result)


        })

        // here is the post method ends




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



// here is the config of mongodb ends



// here is the font or root of the server response
app.get('/', (req, res) => {

    res.send("server is running ")

})

// here is the listining the server
app.listen(port, () => {
    console.log(`serve is running on port${port}`);
})

