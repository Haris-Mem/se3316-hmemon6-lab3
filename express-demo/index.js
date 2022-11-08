window.onload = populatePlaylistComboBox;   //when the page loads call the populatePlaylistComboBox function

//gets all form objects on the html page
const trackForm = document.getElementById("trackForm");
const artistForm = document.getElementById("artistForm");
const albumForm = document.getElementById("albumForm");
const addPlaylistForm = document.getElementById("addPlaylistForm");
const addTracksToPlaylistForm = document.getElementById("addTrackToPlaylistForm");
const displayPlaylistForm = document.getElementById("displayPlaylistForm");
const orderPlaylistForm = document.getElementById("orderPlaylistForm");
const deletePlaylistForm = document.getElementById("deletePlaylistForm");

//add submit event to trackForm
trackForm.addEventListener('submit', function (e) {
    e.preventDefault(); //dont refresh page on form submission

    //this shouldn't display when the user submits this form
    document.getElementById("totalTracks").textContent = "";
    document.getElementById("trackDuration").textContent = "";

    const track = document.getElementById("trackInputBox").value;   //get the track name the user typed in the box

    //send request to server to get a json array of all tracks that include the track name the user typed in the box
    fetch("http://localhost:8080/searchTrackName?track=" + track.toString().toLowerCase(), { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(data => {

            if (data.length == 0) {
                alert("No results found!");
            }
            else {
                populateTrackTable(data);   //builds table and populates it with the data the server sent
            }
        })
        .catch(err => console.log(err));
});

//same functionality as form above, but display artist info isntead
artistForm.addEventListener('submit', function (e) {
    e.preventDefault();

    document.getElementById("totalTracks").textContent = "";
    document.getElementById("trackDuration").textContent = "";

    const artist = document.getElementById("artistInputBox").value;
    
    fetch("http://" + window.location.host + "/searchArtistName?artist=" + artist.toString().toLowerCase(), { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => {
            return res.json();
        })
        .then(data => {

            if (data.length == 0) {
                alert("No results found!");
            }
            else {  //if there is at least one element of content in the server response build a table

                //since the table needs to be cleared everytime, the first time we try to remove by id will be an error so we a try catch block for the first time a table is created
                try {
                    document.getElementById("table").remove();  //
                }
                catch (err) {
                    console.log("Table has not been created yet");
                }

                //Code below builds table via javascript, first step is to initialize the headers, after append a new row depending on how many elements are in the array the server sent, populates table with the values the server sent

                const table = document.createElement("table");
                table.id = "table";
                table.className = "";
                document.getElementById("tableDiv").appendChild(table);
                const headerRow = document.createElement("tr");
                table.appendChild(headerRow);
                const headerArray = ["ARTIST ID", "ARTIST NAME", "WEBSITE", "LOCATION", "FAVOUITE", "COMMENTS", "YEAR OF RELEASE"];

                for (let c = 0; c < headerArray.length; c++) {
                    const header = document.createElement("th");
                    header.appendChild(document.createTextNode(headerArray[c]));
                    headerRow.appendChild(header);
                }

                for (let c = 0; c < data.length; c++) {
                    const tableRow = document.createElement("tr");
                    table.appendChild(tableRow);
                    for (let c2 = 0; c2 < 7; c2++) {
                        const cell = document.createElement("td");
                        cell.appendChild(document.createTextNode(Object.values(data[c])[c2]));
                        table.children.item(c + 1).appendChild(cell);
                    }
                }
            }
        })
        .catch(err => console.log(err));
});

//add submit event to search album form
albumForm.addEventListener('submit', function (e) {
    e.preventDefault(); //don't refresh page

    //this data should not be showed here
    document.getElementById("totalTracks").textContent = "";
    document.getElementById("trackDuration").textContent = "";

    const album = document.getElementById("albumInputBox").value;   //gets the album name the user typed in the box

    //gets all the track jsons that match the album name the user sends to the server
    fetch("http://" + window.location.host + "/searchAlbumName?album=" + album.toString().toLowerCase(), { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => { return res.json() })
        .then(function (data) {

            if (data.length == 0) {
                alert("No results found!");
            }
            else {
                populateTrackTable(data);   //dispay server results in table
            }

        })
        .catch(err => console.log(err));
});

//add submit event to the add playlist form
addPlaylistForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const playlist = document.getElementById("playlistInputBox").value; //gets the value the user typed

    //sends request to the server to create a table in the database with that playlist name the user typed
    fetch("http://" + window.location.host + "/createPlaylist", { method: 'POST', body: JSON.stringify({ listname: playlist.toString() }), headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(function (data) {
        
            if (data == "Error, that playlist already exists or you tried to create a playlist with no name") {     //if that table in the database exists, the user is given a prompt saying this playlist exists already or that they didn't type a name
                alert(data);
            }
            else {

                //updates all comboboxes since user just added a new playlist

                const option = document.createElement("option");
                const option2 = document.createElement("option");
                const option3 = document.createElement("option");
                option.appendChild(document.createTextNode(playlist.toString()));
                option2.appendChild(document.createTextNode(playlist.toString()));
                option3.appendChild(document.createTextNode(playlist.toString()));
                document.getElementById("playlistComboBox").appendChild(option);
                document.getElementById("displayPlaylistComboBox").appendChild(option2);
                document.getElementById("deletePlaylistComboBox").appendChild(option3);
            }
        })
        .catch(err => console.log(err));
});

//adds submit event to form add tracks to playist
addTracksToPlaylistForm.addEventListener("submit", function (e) {

    e.preventDefault(); //dont refresh when the form is submitted

    const trackIdList = document.getElementById("playlistTrackIdList").value;   //gets the list the user typed
    const playlist = document.getElementById("playlistComboBox").value; //seperates the user input into a list of id seperate by comma
    let idArray = trackIdList.toString().split(",");

    //sends the id to the server, the server will use those ids to populate the table the user selects in the combobox in the database
    fetch("http://" + window.location.host + "/populatePlaylist/" + playlist, { method: 'PUT', body: JSON.stringify({ "data": idArray }), headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(data => {
            if (data == "Error") {  //if the tracks weren't added an error pop ups
                alert("Error, playlist doesn't exist");
            }
            else {  //if the tracks are added, the user is notified with a succsess message
                alert("Added tracks to playlist");
            }
        })
        .catch(err => console.log(err))

});

//adds submit event to the display playlist form
displayPlaylistForm.addEventListener("submit", function (e) {

    e.preventDefault(); //dont refresh page

    //this data shouldn't be displayed here
    document.getElementById("totalTracks").textContent = "";
    document.getElementById("trackDuration").textContent = "";

    const playlist = document.getElementById("displayPlaylistComboBox").value;  //gets the playlist name the user chose in the combobox

    //sends request to server to get a array of json track objects in the table in the database
    fetch("http://" + window.location.host + "/getPlaylist?playlist=" + playlist, { method: 'GET', headers: new Headers({'Content-Type': 'application/json'})})
        .then(res => res.json())
        .then(data => {
            if (data == "Error") {
                alert("This playlist doesn't have any tracks");
            }
            else {
                populateTrackTable(data);   //displays table on page

                //code below is a calculation that determines a playlist total duration. It converts the string to an integer value of seconds, adds it all then converts it back to the orignal format

                let totalDuration = 0;
                for (let c = 0; c < data.length; c++) {
                    totalDuration += data[c].durationSeconds;
                    
                }

                const seconds = parseInt(totalDuration % 60);
                const minutes = parseInt(totalDuration / 60);

                console.log(seconds + " " + minutes);
                let duration = "";

                if (seconds < 10) {
                    duration = (minutes + ":0" + seconds)
                }
                else {
                    duration = (minutes + ":" + seconds)
                }

                //displays how many tracks are in the playlist and the total duration of all tracks added
                document.getElementById("totalTracks").appendChild(document.createTextNode("Total Tracks: " + data.length));
                document.getElementById("trackDuration").appendChild(document.createTextNode("Total Track Duration: " + duration));

            }
        })
        .catch(err => console.log(err));
});

//adds submit event to form order playlist
orderPlaylistForm.addEventListener("submit", function (e) {
    e.preventDefault(); //dont refresh the page

    //gets the option the user wants to sort by and the playlist
    const sortOption = document.getElementById("orderPlaylistComboBox").value.toString();
    const playlist = document.getElementById("displayPlaylistComboBox").value.toString();

    let sortString = "";    //this string is passed in the fetch response, it can be one of 4 values

    if (sortOption == "Sort by Track ID") {
        sortString = "sortedPlaylistByTrackId";
    }
    else if (sortOption == "Sort by Artist ID") {
        sortString = "sortedPlaylistByArtistId";
    }
    else if (sortOption == "Sort by Album ID") {
        sortString = "sortedPlaylistByAlbumId";
    }
    else if (sortOption == "Sort by Duration") {
        sortString = "sortedPlaylistByLength";
    }

    //depending on the option the user selected, it will order the playlist depending on the sortString that is passed in
    fetch("http://" + window.location.host + "/" + sortString + "/" + playlist, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(data => {
            if (data == "Error") {
                alert("This playlist doesn't have any tracks to sort by");
            }
            else {
                populateTrackTable(data);   //sorts the table by the sorting option the user requested
            }
        })
        .catch(err => { console.log(err) });
})

//adds submit event to delete playlist form
deletePlaylistForm.addEventListener("submit", function (e) {

    e.preventDefault(); //dont refresh the page

    //this data doesn't need to be displayed
    document.getElementById("totalTracks").textContent = "";
    document.getElementById("trackDuration").textContent = "";

    const deletePlaylist = document.getElementById("deletePlaylistComboBox").value; //gets the playlist the user wants to delete

    //send request to server with the playlist the user chose and delete that table from the database
    fetch("http://" + window.location.host + "/playlist/" + deletePlaylist, { method: "DELETE", headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(data => {
            if (data == "Error") {
                alert("Error, playlist doesn't exist");
            }
            else {
                populateTrackTable({}); //passes in an empty object so the table wipes itself when the user presses delete

                //updates all combo boxes and removes playlist since it no longer exist
                for (let c = 0; c < document.getElementById("deletePlaylistComboBox").children.length; c++) {
                    if (document.getElementById("deletePlaylistComboBox").children.item(c).textContent == deletePlaylist) {
                        document.getElementById("displayPlaylistComboBox").children.item(c).remove();
                        document.getElementById("playlistComboBox").children.item(c).remove();
                        document.getElementById("deletePlaylistComboBox").children.item(c).remove();
                        break;
                    }
                }
            }
        })
        .catch(err => { console.log(err) })
});
function populatePlaylistComboBox() {   //this function populates the combo boxes on page load

    //sends request to server to get the names of the table, the names of the table correspond to the playlist name
    fetch("http://" + window.location.host + "/getPlaylistNames", { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(data => {

            //set the options for each combobox
            for (let c = 0; c < data.length; c++) {
                const option = document.createElement("option");
                const option2 = document.createElement("option");
                const option3 = document.createElement("option");
                option.appendChild(document.createTextNode(data[c].TABLE_NAME));
                option2.appendChild(document.createTextNode(data[c].TABLE_NAME));
                option3.appendChild(document.createTextNode(data[c].TABLE_NAME));
                document.getElementById("playlistComboBox").appendChild(option);
                document.getElementById("displayPlaylistComboBox").appendChild(option2);
                document.getElementById("deletePlaylistComboBox").appendChild(option3);
            }
        })
        .catch(err => console.log(err));
}

function populateTrackTable(data) { //function that builds a table for displaying tracks

    //since the table is removed every time by id, the first time its removed it won't have an id yet so we need a try catch block to avoid this issue
    try {
        document.getElementById("table").remove();
    }
    catch (err) {
        console.log("Table hasn't been made for a first time");
    }

    //Code below builds table with appropriate headers and populates itself using the data passed in as parameter in the function

    const table = document.createElement("table");
    table.id = "table";
    table.className = "";

    document.getElementById("tableDiv").appendChild(table);

    const headerRow = document.createElement("tr");
    table.appendChild(headerRow);

    const headerArray = ["TRACK ID", "TRACK NAME", "ARTIST ID", "ARTIST NAME", "ALBUM ID", "ALBUM NAME", "DATE CREATED", "DATE RECORDED", "TAGS", "GENRES", "TRACK NUMBER", "DURATION"];

    //display all table headers
    for (let c = 0; c < headerArray.length; c++) {
        const header = document.createElement("th");
        header.appendChild(document.createTextNode(headerArray[c]));
        headerRow.appendChild(header);
    }

    //populate all table rows with the data that was passed in the function
    for (let c = 0; c < data.length; c++) {
        const tableRow = document.createElement("tr");
        table.appendChild(tableRow);
        for (let c2 = 0; c2 < 12; c2++) {
            const cell = document.createElement("td");
            if (c2 == 9) {  //on column 9 a weird string of jsons is passed, this makes the genres look presentable
                const genreJSON = JSON.parse(Object.values(data[c])[c2].replace(/[']/g, '"'));
                let genreString = "";
                for (let c3 = 0; c3 < genreJSON.length; c3++) {
                    genreString = genreString.concat(genreJSON[c3].genre_title);
                }
                cell.appendChild(document.createTextNode(genreString));
            }

            else {
                cell.appendChild(document.createTextNode(Object.values(data[c])[c2]));
            }
            table.children.item(c + 1).appendChild(cell);
        }
    }
}
