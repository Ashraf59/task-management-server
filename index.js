const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;




const app = express();

//Middlewear

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l1ydak8.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const addtaskCollection = client.db('taskManagement').collection('addtask');

        app.get('/addtasks', async(req, res) => {
            const query = {}
            const addtask = await addtaskCollection.find(query).toArray();
            res.send(addtask);
        })

        app.post('/addtasks', async(req, res) =>{
            const addtask = req.body;
            const result = await addtaskCollection.insertOne(addtask);
            res.send(result)
        })

        app.delete('/addtasks/:id', async(req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const result = await addtaskCollection.deleteOne(filter);
            res.send(result)
        })
    }
    finally{
       
    }

}
run().catch(console.log);




app.get('/', async(req, res) => {
    res.send('Task Management Server is Running')
})

app.listen(port, () => console.log(`Task Management Server is Running on ${port}`))