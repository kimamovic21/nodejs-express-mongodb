const express = require('express');
const router = express.Router();
const Alien = require('../models/Alien');

router.get('/', async(req,res) => {
    try {
        const aliens = await Alien.find()
        res.json(aliens)
    } catch(err){
        res.send('Error ' + err)
    }
});

router.get('/:id', async(req,res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        res.json(alien)
    } catch(err){
        res.send('Error ' + err)
    };
});

router.post('/', async(req,res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    });

    try {
        const newAlien =  await alien.save();
        res.json(newAlien);
    } catch (err){
        res.send('Error')
    };
});

router.put('/:id',async(req,res)=> {
    try {
        const alien = await Alien.findByIdAndUpdate(req.params.id); 
        alien.name = req.body.name;
        const updateAlien = await alien.save();
        res.json(updateAlien);   
    } catch (err){
        res.send('Error');
    };
});

router.delete('/:id', async(req,res) => {
    try {
        const deletedAlien = await Alien.findByIdAndDelete(req.params.id);
        res.json(deletedAlien);
    } catch (err) {
        res.send('Cannot find an alien!');
    };
});

module.exports = router;
