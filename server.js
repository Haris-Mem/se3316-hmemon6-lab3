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



app.listen(3000, () => console.log("Listening on port 3000"));

app.get('/getTrackSR', function(req,res){
    var trackSearch = req.query.trackSearchBar; //Name of search Bar

    var trackSearchResults = tracksCsvData.filter(tracksCsvData => tracksCsvData.track_title.toString().toLowerCase().includes(trackSearch.toLowerCase()));

    var TrackSR = [];

    for(var i=0; i < trackSearchResults.length; i++)
    {
        var tempTrackJson = {};

        tempTrackJson.track_id = trackSearchResults[i].track_id;
        tempTrackJson.track_title = trackSearchResults[i].track_title;
        tempTrackJson.album_id = trackSearchResults[i].album_id;
        tempTrackJson.album_title = trackSearchResults[i].album_title;
        tempTrackJson.artist_id = trackSearchResults[i].artist_id;
        tempTrackJson.artist_name = trackSearchResults[i].artist_name;
        tempTrackJson.tags = trackSearchResults[i].tags;
        tempTrackJson.track_date_created = trackSearchResults[i].track_date_created;
        tempTrackJson.track_date_recorded = trackSearchResults[i].track_date_recorded;
        tempTrackJson.track_genres = trackSearchResults[i].track_genres;
        tempTrackJson.track_number = trackSearchResults[i].track_number;

        TrackSR.push(tempTrackJson);
    }
    res.send(TrackSR);
});

app.get('/getAlbumSR', function(req,res){

    var albumSearch = req.query.albumSearchBar //Name of search Bar
    var albumSearchResults = albumCsvData.filter(tracksCsvData => tracksCsvData.track_tittle.toString().toLowerCase().includes(trackSearch.toLowerCase()));
    var albumSR = [];

    for(var i=0; i < albumSearchResults.length; i++)
    {
        var tempTrackJson = {};

        tempTrackJson.track_id = albumSearchResults[i].track_id;
        tempTrackJson.track_title = albumSearchResults[i].track_title;
        tempTrackJson.album_id = albumSearchResults[i].album_id;
        tempTrackJson.album_title = albumSearchResults[i].album_title;
        tempTrackJson.artist_id = albumSearchResults[i].artist_id;
        tempTrackJson.artist_name = albumSearchResults[i].artist_name;
        tempTrackJson.tags = albumSearchResults[i].tags;
        tempTrackJson.track_date_created = albumSearchResults[i].track_date_created;
        tempTrackJson.track_date_recorded = albumSearchResults[i].track_date_recorded;
        tempTrackJson.track_genres = albumSearchResults[i].track_genres;
        tempTrackJson.track_number = albumSearchResults[i].track_number;

        TrackSR.push(tempTrackJson);
    }
    res.send(albumSR);
});

app.get('/getArtistSR', function(req,res){

    var artistSearch = req.query.artistSearchBar //Name of search Bar
    var artistResults = artistCsvData.filter(tracksCsvData => tracksCsvData.track_tittle.toString().toLowerCase().includes(trackSearch.toLowerCase()));
    var artistSR = [];

    for(var i=0; i < artistResults.length; i++)
    {
        var tempTrackJson = {};

        tempTrackJson.artist_name = artistResults[i].artist_name;
        tempTrackJson.artist_id = artistResults[i].artist_id;
        tempTrackJson.artist_date_created = artistResults[i].artist_date_created;
        tempTrackJson.artist_location = artistResults[i].artist_location;
        tempTrackJson.artist_active_year_begin = artistResults[i].artist_active_year_begin;
        tempTrackJson.artist_favorites = artistResults[i].artist_favorites;

        TrackSR.push(tempTrackJson);
    }
    res.send(artistSR);

});

//app.use(express.json());

//app.use('/',express.static('static'));

//app.get();


