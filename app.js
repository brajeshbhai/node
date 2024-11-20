const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Load links from JSON file
let links = [];
fs.readFile(path.join(__dirname, 'links.json'), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    links = JSON.parse(data);
});

// Search functionality
app.post('/search', (req, res) => {
    const query = req.body.query.toLowerCase();
    const results = links.filter(link => link.keyword.toLowerCase().includes(query));
    res.send({ results });
});

// Serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
