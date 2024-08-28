const express = require("express");
const notes = require("./data/notes");
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("API is running...");
})

// app.get('/api/notes', (req, res) => {
//     res.json(notes);
// })

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.use(notFound)
app.use(errorHandler)

// app.get('/api/notes/:id', (req, res) => {
//     const note = notes.find((n) => n._id === req.params.id);
//     res.send(note);
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));