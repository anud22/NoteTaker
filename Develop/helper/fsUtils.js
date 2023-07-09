const fs = require('fs');
const util = require('util');

var readFromFile = util.promisify(fs.readFile);

var readAndAppend = (file, content) => {
    fs.readFile(file, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let parsedData = [];
        if (data.length > 0) {
            parsedData = JSON.parse(data);
        }

        parsedData.push(content);
        writeToFile(file, parsedData);
    })
}
var writeToFile = (file, content) => {
    fs.writeFile(file, JSON.stringify(content), (err) => {
        if (err) {
            console.log(err);
        }
    });
}


module.exports = { readFromFile, readAndAppend, writeToFile };