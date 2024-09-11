const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('./config/mongoose.config');
const routes = require('./routes/project.routes');

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
