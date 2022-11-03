const parse = require('csv-parse');
const fs = require('fs');
const csvData = [];

fs.createReadStream('Lab3_Data\genres.csv')
    .pipe(
        parse({
            delimiter: ','
        })
    )
    .on('data',function(dataRow){
        csvData.push(dataRow);
    })
    .on('end',function(){
        console.log(csvData);
    })