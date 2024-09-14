require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/mongoose.config');

const projectRoutes = require('./routes/project.routes');
const userRoutes = require('./routes/user.routes');

const port = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

projectRoutes(app);
userRoutes(app);

app.listen(port, () => console.log(`Server running on port ${port}`));
