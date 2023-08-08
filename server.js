const express = require('express');
const db = require('./config/connection')
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('api/thoughts', thoughtRoutes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on ${PORT}`);
    })
})

