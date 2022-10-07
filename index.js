const express = require('express');
const app = express();
const Joi = require('joi');
const genres = require('./routes/genres');
app.use(express.json()); // middleware
app.use('/api/genres/', genres);


app.get('/',(req,res)=>{
    res.send('Yo!');
});


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is listening to ${port}`);
})