const express = require('express');
const app = express();
const mongoose = require('mongoose');
const serverPort = 3000;
const BudgetData = require('./models/budgetSchema');
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

app.get('/budget', async (req, res) => {
    try {
        await mongoose.connect('mongodb://localhost:27017/jagadish', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
        const data = await BudgetData.find({});
        res.json(data);
        mongoose.connection.close();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/postBudgetData", async (req, res) => {
    try {
        await mongoose.connect('mongodb://localhost:27017/jagadish', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
        const newData = new BudgetData(req.body);
        await newData.save();
        res.send("Data Inserted Successfully");
        mongoose.connection.close();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(serverPort, () => {
    console.log(`Server is now listening on http://localhost:${serverPort}`);
});
