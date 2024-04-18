const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');

const port = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(bodyParser.json()); // Used to parse JSON bodies

// Logging requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
router(app);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
