const csv = require('csv-parser');
const fs = require('fs');

const genresCsvData = [];
const albumCsvData = [];
const artistCsvData = [];
const tracksCsvData = [];

fs.createReadStream("Lab3_Data/genres.csv").pipe(csv({})).on("data", (data) => genresCsvData.push(data));
//console.log(genresCsvData);

fs.createReadStream("Lab3_Data/raw_albums.csv")
.pipe(csv({}))
.on("data", (data) => albumCsvData.push(data));
//console.log(albumCsvData);

fs.createReadStream("Lab3_Data/raw_artists.csv")
.pipe(csv({}))
.on("data", (data) => artistCsvData.push(data));
console.log(artistCsvData)

fs.createReadStream("Lab3_Data/raw_tracks.csv")
.pipe(csv({}))
.on("data", (data) => tracksCsvData.push(data));
//console.log(tracksCsvData)

