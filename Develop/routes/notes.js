const express = require('express');
const path = require('path');
const fs = require('fs');
const {readFromFile} = require('../helper/fsUtils.js');


const notes = express.Router();
const dbPath = path.join(__dirname, '../db/db.json');
notes.get('/', (req, res) => {
    readFromFile(dbPath).then((data) => {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    }).catch((error) => {
        console.error('Error reading the db.json file:', error);
        res.sendStatus(500);
    });
});

module.exports = notes;