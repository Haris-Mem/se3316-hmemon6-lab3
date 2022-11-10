//importing express
const express = require("express")
const app = express();

//importing parser
const csv = require('csv-parser');
const fs = require('fs');

//importing database library
const JSONdb = require('simple-json-db');
const db = new JSONdb('database.json');

// Csv Data constants
const genresCsvData = [];
const albumCsvData = [];
const artistCsvData = [];
const tracksCsvData = [];

app.use('/', express.static('static'));

app.listen(3000);
console.log('Listening on port 3000...')

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



// track by name
app.get('/getTrackSR', function(req,res){
     
    var trackSearch = req.query.trackSearchBar; //Name of search Bar

    var trackSearchResults = tracksCsvData.filter(tracksCsvData => tracksCsvData.track_title.toString().toLowerCase().includes(trackSearch.toLowerCase()));

    var trackSR = [];

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

        trackSR.push(tempTrackJson);
    }
    res.send(trackSR);
}); 

//album by search
app.get('/getAlbumSR', function(req,res){

    var albumSearch = req.query.albumSearchBar //Name of search Bar
    var albumSearchResults = albumCsvData.filter(albumCsvData => albumCsvData.album_title.toString().toLowerCase().includes(albumSearch.toLowerCase()));
    var albumSR = [];

    for(var i=0; i < albumSearchResults.length; i++)
    {
        var tempAlbumJson = {};

        tempAlbumJson.track_id = albumSearchResults[i].track_id;
        tempAlbumJson.track_title = albumSearchResults[i].track_title;
        tempAlbumJson.album_id = albumSearchResults[i].album_id;
        tempAlbumJson.album_title = albumSearchResults[i].album_title;
        tempAlbumJson.artist_id = albumSearchResults[i].artist_id;   
        tempAlbumJson.artist_name = albumSearchResults[i].artist_name;
        tempAlbumJson.tags = albumSearchResults[i].tags;
        tempAlbumJson.track_date_created = albumSearchResults[i].track_date_created;
        tempAlbumJson.track_date_recorded = albumSearchResults[i].track_date_recorded;
        tempAlbumJson.track_genres = albumSearchResults[i].track_genres;
        tempAlbumJson.track_number = albumSearchResults[i].track_number;

        albumSR.push(tempAlbumJson);
    }
    res.send(albumSR);
});

app.get('/getArtistSR', function(req,res){

    var artistSearch = req.query.artistSearchBar //Name of search Bar
    var artistResults = artistCsvData.filter(artistCsvData => artistCsvData.artist_name.toString().toLowerCase().includes(artistSearch.toLowerCase()));
    var artistSR = [];

    for(var i=0; i < artistResults.length; i++)
    {
        var tempArtistJson = {};

        tempArtistJson.artist_name = artistResults[i].artist_name;
        tempArtistJson.artist_id = artistResults[i].artist_id;
        tempArtistJson.artist_date_created = artistResults[i].artist_date_created;
        tempArtistJson.artist_location = artistResults[i].artist_location;
        tempArtistJson.artist_active_year_begin = artistResults[i].artist_active_year_begin;
        tempArtistJson.artist_favorites = artistResults[i].artist_favorites;

        artistSR.push(tempArtistJson);
    }
    res.send(artistSR);

});


//create playlist with name
app.post('/api/playlists/:given_name', (req,res) => {
    const playlistName = req.params.given_name;
    if(!db.has(playlistName))
    {
        db.set(playlistName,'');
        res.send("Playlist created");
    }
    else{
        res.status(404).send(`List ${playlistName} exists`);
    }
    
});

//modify existing playlist
app.put("/api/playlists/:given_name", (req,res) => {
    const playlistName = req.params.given_name;
    const trackList = req.query.trackList;

    if(db.has(playlistName))
    {
        db.set(playlistName, trackList);
        res.send(`Playlist ${playlistName} has been modified`)
    }
    else{
        res.status(404).send(`Playlist ${playlistName} does not exist`);
    }
});

//delete playlist
app.delete('/api/playlists/:given_name', (req,res) =>{
    const listName = req.params.given_name;
    if(db.has(listName))
    {
        db.delete(listName);
        res.send(`Playlist ${listName} deleted`)
    }
    else
    {
        res.status(404).send(`Playlist ${playlistName} does not exist`);
    }
});

//get list of tracks ID's in a playlist
app.get('/api/playlists/:given_name' , (req,res) => {
    const playlistName = req.params.given_name;
    if(db.has(playlistName)){
        trackList = db.get(playlistName);
        res.send(`Playlist Track IDs: ${trackList}`)
    }
    else
    {
        res.status(404).send(`Playlist ${playlistName} does not exist`);
    }
});

//get name, num, and play time of tracks ID's in a playlist
app.get('/api/playlists/' , (req,res) => {
    objectArray = [];
    // all playlist names in the db
    playlistNames = Object.keys(db.JSON());
    for(const i of playlistNames)
    {
        var durationSum = 0;
    
        TrackIDarray = db.get(i).split(',');
        trackNum = TrackIDarray.length;

        if(db.get(i) == ""){
            trackNum = 0;
        }

        for(const id of TrackIDarray)
        {
            track = tracksCsvData.find(t => parseInt(t.track_id) === parseInt(id))
            if(track) // skip undefined track
            {
                duration = track.track_duration.split(':')
                durationSum += parseInt(duration[0])*60 + parseInt(duration[1]);
            }
        }
        objectArray.push({playlistName: i, trackTotal: trackNum, playlistDuration: durationSum/60 + " Minutes"})
    }
    res.send(objectArray);
});



