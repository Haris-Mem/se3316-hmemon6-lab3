const express = require("express")
const app = express();

app.listen(3000, ()=> console.log("Listening on port 3000"));

const csv = require('csv-parser');
const fs = require('fs');

const genresCsvData = [];
const albumCsvData = [];
const artistCsvData = [];
const tracksCsvData = [];

fs.createReadStream("Lab3_Data/genres.csv").pipe(csv({})).on("data", (data) => genresCsvData.push(data));

fs.createReadStream("Lab3_Data/raw_albums.csv")
.pipe(csv({}))
.on("data", (data) => albumCsvData.push(data));


fs.createReadStream("Lab3_Data/raw_artists.csv")
.pipe(csv({}))
.on("data", (data) => artistCsvData.push(data));


fs.createReadStream("Lab3_Data/raw_tracks.csv")
.pipe(csv({}))
.on("data", (data) => tracksCsvData.push(data));


