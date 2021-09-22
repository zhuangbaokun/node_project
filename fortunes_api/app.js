const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const fortunes = require('./data/fortunes')

const port = 3000;

const app = express(); // express applications


// app.use(bodyParser.urlencoded({
//     extended: true
//   }));

app.use(bodyParser.json());

app.get('/fortunes', (req, res) => {
    res.json(fortunes);
});

app.get('/fortunes/random', (req,res) => {
    console.log('requesting random fortune');

    const random_index = Math.floor(Math.random() * fortunes.length);

    const r_fortune = fortunes[random_index];
    res.json(r_fortune)
});

app.get('/fortunes/:id', (req, res) => { //check ID
    console.log(req.params);

    res.json(fortunes.find(f => f.id == req.params.id));
});

app.post('/fortunes', (req, res) => {
    console.log(req.body);

    const {message, lucky_number, spirit_animal} = req.body;

    const fortune_ids = fortunes.map(f => f.id);
    
    const new_fortunes = fortunes.concat({
        id: (fortune_ids.length>0 ? Math.max(...fortune_ids) : 0) + 1,
        message,
        lucky_number, 
        spirit_animal});
    
    fs.writeFile('./data/fortunes.json', JSON.stringify(new_fortunes), err => console.log(err));

    res.json(new_fortunes);
});


app.put('/fortunes/:id', (req,res) => {
    const {id} = req.params;
    const {message, lucky_number, spirit_animal} = req.body;
    const old_fortune = fortunes.find(f => f.id== id);
    console.log("Original JSON")
    console.log(old_fortune)
    if (message) old_fortune.message = message;
    if (lucky_number) old_fortune.lucky_number = lucky_number;
    if (spirit_animal) old_fortune.spirit_animal = spirit_animal;

    console.log("Updated JSON")
    console.log(fortunes)
    fs.writeFile('./data/fortunes.json', JSON.stringify(fortunes), err => console.log(err));

    res.json(fortunes)
})

app.listen(port, () => console.log(`Listening on port ${port}`))