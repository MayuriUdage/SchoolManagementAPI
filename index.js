const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const schoolroutes = require('./routes/schoolroutes');

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the School Management API!');
});


app.use('/api/schools', schoolroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
