const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const BACKEND_URL = "http://backend:5000";

app.get('/', async (req, res) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api`);
        const data = await response.json();

        res.send(`
            <h1>Frontend</h1>
            <p>${data.message}</p>
        `);
    } catch (error) {
        res.send("Error connecting backend");
    }
});

app.listen(3000, () => {
    console.log("Frontend running on port 3000");
});
