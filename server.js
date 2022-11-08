//importing express
const express = require("express")
const app = express();

//importing parser
const csv = require('csv-parser');
const fs = require('fs');

// Csv Data constants
const genresCsvData = [];
const albumCsvData = [];
const artistCsvData = [];
const tracksCsvData = [];


//genres
fs.createReadStream("Lab3_Data/genres.csv")
.pipe(csv({}))
.on("data", (data) => genresCsvData.push(data));

//albums
fs.createReadStream("Lab3_Data/raw_albums.csv")
.pipe(csv({}))
.on("data", (data) => albumCsvData.push(data));

//artist
fs.createReadStream("Lab3_Data/raw_artists.csv")
.pipe(csv({}))
.on("data", (data) => artistCsvData.push(data));

//tracks
fs.createReadStream("Lab3_Data/raw_tracks.csv")
.pipe(csv({}))
.on("data", (data) => tracksCsvData.push(data));

app.use(express.json());

app.use('/',express.static('static'));

//app.get();


