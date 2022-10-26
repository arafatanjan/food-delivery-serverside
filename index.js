const express = require('express');
// const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;

//mydbuser1
// EjfkxOaI3MFyBR4r
//mddleware
app.use(cors());
app.use(express.json());
// const handler = (req, res) => {

// app.get('/', handler);


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gxpyubl.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db("foodcluster");
        // const database = client.db("foodmaster");
        // const usersCollection = database.collection("users");
        const usersCollection = database.collection("services");
        const ordersCollection = database.collection("orders");

        // GET API
        app.get('/services', async (req, res) => {

            const cursor = usersCollection.find({})
            const services = await cursor.toArray();
            // res.send(users);
            res.json(services);
        })
        // GET SINGLE SERVICE
        app.get('/services/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            console.log('getting service', id)
            const service = await usersCollection.findOne(query);
            // res.send(users);
            res.json(service);
        })
        //post API
        app.post('/orders', async (req, res) => {
            // res.send('added user');
            const newUser = req.body;
            const result = await ordersCollection.insertOne(newUser);
            console.log('added user', result);
            res.json(result);
        });

        // GET API
        app.get('/orders', async (req, res) => {

            const cursor = ordersCollection.find({})
            const orders = await cursor.toArray();
            // res.send(users);
            res.json(orders);
        });

        // GET API
        app.get('/orders/:email', async (req, res) => {
            // console.log(req.params.email);
            const result = await ordersCollection.find({ email: req.params.email }).toArray();
            res.json(result);
        });
        //post API
        app.post('/services', async (req, res) => {
            const service = req.body;

            const result = await usersCollection.insertOne(service);
            // console.log('Hit the post', service);
            console.log(result);

            // res.json(result);
            res.json(result);
        });

        // app.get('/users/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const user = await usersCollection.findOne(query);
        //     console.log('load user with id', id);
        //     res.send(user);
        // })
        // delete
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            console.log('deleting user id', result);
            res.json(result);
        })
        // delete
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            console.log('deleting user id', result);
            res.json(result);
        })

        //put
        app.put('/orders/update/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const updatedStatus = 'updated';
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: updatedStatus
                },
            };
            const result = await ordersCollection.updateOne(filter, updateDoc, options)
            console.log('j')
            res.json(result)
        })


        // create a document to insert
        // const doc = {
        //     name: "hk",
        //     email: "kk@hotmail.com",
        // }
        // const result = await usersCollection.insertOne(doc);
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    }
    finally {
        // await client.close();
    }
};
run().catch(console.dir);
// client.connect(err => {
//     const collection = client.db("foodmaster").collection("users");
//     //     // perform actions on the collection object
//     console.log('Hittin the data');
//     // console.error(err);
//     const user = { name: 'ma', email: 'm@m', phone: '0000' };
//     collection.insertOne(user)
//         .then(() => {
//             console.log('success');
//         })
//     client.close();
// });
// async function run() {
//     try {
//         const database = client.db("foodmaster");
//         const usersCollection = database.collection("users");
//         //post API
//         app.post('/users', async (req, res) => {
//             console.log('hitting post', req.body);
//             res.send('hit post');
//         })
// create a document to insert
// const doc = {
//     name: "kk",
//     email: "kk@hotmail.com",
// }
// const result = await usersCollection.insertOne(doc);
// console.log(`A document was inserted with the _id: ${result.insertedId}`);
//     } finally {
//         await client.close();
//     }
// }

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log('Running Server on port', port);
});
// run().catch(console.dir);
// client.connect(err => {
//     const collection = client.db("foodmaster").collection("users");
//     // perform actions on the collection object
//     console.log('Hittin the data');
//     // console.error(err);
//     const user = { name: 'ma', email: 'm@m', phone: '0000' };
//     collection.insertOne(user)
//         .then(() => {
//             console.log('success');
//         })
//     // client.close();
// });


app.get('/', (req, res) => {
    res.send('QT World!');
});

// app.get('/users', (req, res) => {
//     res.send('QTY World!');
// });

