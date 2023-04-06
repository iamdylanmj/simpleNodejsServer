//* this module does is, each time the server gets a request, it is going to create and write loggin message with the requested date and time, and with unique ID in a text file

const { format } = require('date-fns');
const { v4:uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logData = async (message, fileName) => {
    const dateTime = format(new Date(), 'yyyy-LLL-do\tkk:mm:ss');
    const logRecord = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logRecord);
    try {
       await fsPromises.appendFile(path.join(__dirname, `${fileName}`), logRecord);

    } catch(err) {
        // this happens when inernal error encounters
        console.log(err); 
    } 
};

module.exports = logData;