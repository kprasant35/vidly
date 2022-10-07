const express = require('express');
const router = express.Router();
const Joi = require('joi');

let genres=[
    { id: 1, name: "Comedy" },
    { id: 2, name: "Fantasy" },
    { id: 3, name: "Science Fiction" },
]

router.get('/',(req,res)=>{
    res.send(genres);
});

router.get('/:id',(req,res)=>{

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

router.post('/',(req,res)=>{

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

router.put('/:id',(req,res)=>{
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

router.delete('/:id',(req,res)=>{
    const genre = genres.find(item => item.id === parseInt(req.params.id));
    if(!genre){
        return res.status(404).send('Error 404 Not Found');
    }
    const ind = genres.indexOf(genre);
    genres.splice(ind,1);
    res.send(genre);
});

module.exports = router;