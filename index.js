const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json()); // middleware

let genres=[
    {
        id: 1,
        name: "Comedy"
    },
    {
        id: 2,
        name: "Fantasy"
    },
    {
        id: 3,
        name: "Science Fiction"
    },
]
app.get('/',(req,res)=>{
    res.send('Yo!');
});

app.get('/genres',(req,res)=>{
    res.send(genres);
});

app.get('/genres/:id',(req,res)=>{

    const genre = genres.find(item => item.id === parseInt(req.params.id));
    if(!genre){
        return res.status(404).send('Error 404 Not Found');
    }
    res.send(genre);

});
function validate(body){
    const schema = Joi.object({
        name: Joi.string().required()
    });

    return schema.validate(body);
};

app.post('/genres',(req,res)=>{

    const result = validate(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    const genre = {
        id: genres.length+1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

app.put('/genres/:id',(req,res)=>{
    const genre = genres.find(item => item.id === parseInt(req.params.id));
    if(!genre){
        return res.status(404).send('Error 404 Not Found');
    }
    const result = validate(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/genres/:id',(req,res)=>{
    const genre = genres.find(item => item.id === parseInt(req.params.id));
    if(!genre){
        return res.status(404).send('Error 404 Not Found');
    }
    const ind = genres.indexOf(genre);
    genres.splice(ind,1);
    res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is listening to ${port}`);
})