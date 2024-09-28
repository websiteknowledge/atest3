// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let requests = [];

// Route to handle item requests
app.post('/request-item', (req, res) => {
    const { itemName, userName } = req.body;
    if (itemName && userName) {
        requests.push({ itemName, userName, timestamp: new Date() });
        console.log(`New request: ${itemName} by ${userName}`);
        res.status(200).send('Request successful');
    } else {
        res.status(400).send('Invalid request');
    }
});

// Route to fetch all requests for the admin dashboard
app.get('/requests', (req, res) => {
    res.json(requests);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
