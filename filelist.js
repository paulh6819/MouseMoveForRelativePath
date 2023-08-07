const fs = require('fs');
const drawings = '/Users/admin/Desktop/drawings';


fs.readdir(drawings, (err, files) => {
    files.forEach(element => {
        console.log(element)
    });
})