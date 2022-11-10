const trackForm = document.getElementById("trackForm");
const artistForm = document.getElementById("artistForm");
const albumForm = document.getElementById("albumForm");

trackForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const track = document.getElementById("trackSearchBar").value;
    
    fetch("http://" + window.location.host + "/getTrackSR?trackSearchBar=" + track.toString().toLowerCase(), { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => {
            return res.json();
        })
        .then(data => {

            if (data.length == 0) {
                alert("No results found!");
            }
            else {
                try {
                    document.getElementById("table").remove();  //
                }
                catch (err) {
                    console.log("Table has not been created yet");
                }

                const table = document.createElement("table");
                table.id = "table";
                table.className = "";
                document.getElementById("tableDiv").appendChild(table);
                const headerRow = document.createElement("tr");
                table.appendChild(headerRow);
                const headerArray = ["TRACK ID", "TRACK NAME", "Album ID", "Album NAME", "Artist ID", "Artist NAME", "DATE CREATED", "DATE RECORDED", "TAGS", "GENRES", "TRACK NUMBER", "DURATION"];
                for (let c = 0; c < headerArray.length; c++) {
                    const header = document.createElement("th");
                    header.appendChild(document.createTextNode(headerArray[c]));
                    headerRow.appendChild(header);
                }

                for (let c = 0; c < data.length; c++) {
                    const tableRow = document.createElement("tr");
                    table.appendChild(tableRow);
                    for (let c2 = 0; c2 < 12; c2++) {
                        const cell = document.createElement("td");
                        cell.appendChild(document.createTextNode(Object.values(data[c])[c2]));
                        table.children.item(c + 1).appendChild(cell);
                    }
                }
            }
        })
        .catch(err => console.log(err));
});

artistForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const artist = document.getElementById("artistSearchBar").value;
    
    fetch("http://" + window.location.host + "/getArtistSR?artistSearchBar=" + artist.toString().toLowerCase(), { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => {
            return res.json();
        })
        .then(data => {

            if (data.length == 0) {
                alert("No results found!");
            }
            else {
                try {
                    document.getElementById("table").remove();  //
                }
                catch (err) {
                    console.log("Table has not been created yet");
                }

                const table = document.createElement("table");
                table.id = "table";
                table.className = "";
                document.getElementById("tableDiv").appendChild(table);
                const headerRow = document.createElement("tr");
                table.appendChild(headerRow);
                const headerArray = ["Artist Name", "Artist ID", "Registration", "Location", " Creation Date", "Favourites"];
                for (let c = 0; c < headerArray.length; c++) {
                    const header = document.createElement("th");
                    header.appendChild(document.createTextNode(headerArray[c]));
                    headerRow.appendChild(header);
                }

                for (let c = 0; c < data.length; c++) {
                    const tableRow = document.createElement("tr");
                    table.appendChild(tableRow);
                    for (let c2 = 0; c2 < 6; c2++) {
                        const cell = document.createElement("td");
                        cell.appendChild(document.createTextNode(Object.values(data[c])[c2]));
                        table.children.item(c + 1).appendChild(cell);
                    }
                }
            }
        })
        .catch(err => console.log(err));
});

albumForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const album = document.getElementById("albumSearchBar").value;
    
    fetch("http://" + window.location.host + "/getAlbumSR?albumSearchBar=" + album.toString().toLowerCase(), { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => {
            return res.json();
        })
        .then(data => {

            if (data.length == 0) {
                alert("No results found!");
            }
            else {
                try {
                    document.getElementById("table").remove();  //
                }
                catch (err) {
                    console.log("Table has not been created yet");
                }

                const table = document.createElement("table");
                table.id = "table";
                table.className = "";
                document.getElementById("tableDiv").appendChild(table);
                const headerRow = document.createElement("tr");
                table.appendChild(headerRow);
                const headerArray = ["Album ID", "Artist Name", "Artist", "Tags", " Creation Date", "Favourites"];
                for (let c = 0; c < headerArray.length; c++) {
                    const header = document.createElement("th");
                    header.appendChild(document.createTextNode(headerArray[c]));
                    headerRow.appendChild(header);
                }

                for (let c = 0; c < data.length; c++) {
                    const tableRow = document.createElement("tr");
                    table.appendChild(tableRow);
                    for (let c2 = 0; c2 < 6; c2++) {
                        const cell = document.createElement("td");
                        cell.appendChild(document.createTextNode(Object.values(data[c])[c2]));
                        table.children.item(c + 1).appendChild(cell);
                    }
                }
            }
        })
        .catch(err => console.log(err));
});

displayPlaylistForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const playlistName = document.getElementById("playlistSearch");

    fetch("http://" + window.location.host+"/api/playlists/",{ method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
    .then(res => res.json())
    .then(data => {
        
        if (data.length == 0) {
            alert("No results found!");
        }
        else {
            try {
                document.getElementById("table").remove();  //
            }
            catch (err) {
                console.log("Table has not been created yet");
            }

            const table = document.createElement("table");
            table.id = "table";
            table.className = "";
            document.getElementById("tableDiv").appendChild(table);
            const headerRow = document.createElement("tr");
            table.appendChild(headerRow);
            const headerArray = ["Playlist Name", "Track Total", "Playlist Duration"];
            for (let c = 0; c < headerArray.length; c++) {
                const header = document.createElement("th");
                header.appendChild(document.createTextNode(headerArray[c]));
                headerRow.appendChild(header);
            }

            for (let c = 0; c < 2; c++) {
                const tableRow = document.createElement("tr");
                table.appendChild(tableRow);
                for (let c2 = 0; c2 < 3; c2++) {
                    const cell = document.createElement("td");
                    cell.appendChild(document.createTextNode(Object.values(data[c])[c2]));
                    table.children.item(c + 1).appendChild(cell);
                }
            }
        }
    })
});

function populatePlaylistComboBox() {   //this function populates the combo boxes on page load

    //sends request to server to get the names of the table, the names of the table correspond to the playlist name
    fetch("http://" + window.location.host + "/api/playlists/", { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
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