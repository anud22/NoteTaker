const express = require('express');
const path = require('path');
const { readFromFile, readAndAppend, writeToFile } = require('../helper/fsUtils.js');
const uuid = require('../helper/uuid.js');
const dbPath = path.resolve(path.join(__dirname, '../db/db.json'));
const notes = express.Router();

notes.get('/', (req, res) => {
    readFromFile(dbPath).then((data) => {
        let jsonData = [];
        if (data.length > 0) {
            jsonData = JSON.parse(data);
        }
        res.json(jsonData);
    }).catch((error) => {
        console.error('Error reading the db.json file:', error);
        res.status(400).json(error);
    });
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    const newNotes = { id: uuid(), title: title, text: text };
    if (title && text) {
        readAndAppend(dbPath, newNotes);
        res.status(200).json(newNotes);
        return;
    } else {
        res.status(400).json("Post request should include single title & text");
    }
})

notes.delete('/:id', (req, res) => {
    if (req.params.id) {
        readFromFile(dbPath).then((data) => {
            if (data.length == 0) {
                res.status(400).json("No data found");
                return;
            }
            const contents = JSON.parse(data);
            console.log('old', contents);
            const newContents = contents.filter(x => x.id !== req.params.id);
            console.log('new', newContents);
            if (contents.length === newContents.length) {
                res.status(400).json("id not found");
                return;
            }
            writeToFile(dbPath, newContents);
            res.status(200).json(`Deleted id ${req.params.id}`);
        }).catch((error) => {
            console.error('Error reading the db.json file:', error);
            res.status(400).json(error);
        });
    } else {
        res.status(400).json("Delete request should include id");
    }
})

module.exports = notes;