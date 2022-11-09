const trackForm = document.getElementById("trackForm");
const artistForm = document.getElementById("artistForm");
const albumForm = document.getElementById("albumForm");

trackForm.addEventListener('submit', function (e) {
    e.preventDefault();


    const artist = document.getElementById("trackSearchBar").value;
    
    fetch("http://" + window.location.host + "/getTrackSR?trackSearchBar=" + artist.toString().toLowerCase(), { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
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
                const headerArray = ["ARTIST ID", "ARTIST NAME", "WEBSITE", "LOCATION", "FAVOUITE", "COMMENTS", "YEAR OF RELEASE"];

                for (let c = 0; c < headerArray.length; c++) {
                    const header = document.createElement("th");
                    header.appendChild(document.createTextNode(headerArray[c]));
                    headerRow.appendChild(header);
                }

                for (let c = 0; c < 7; c++) {
                    const tableRow = document.createElement("tr");
                    table.appendChild(tableRow);
                }
            }
        })
        .catch(err => console.log(err));
});


albumForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const albumInput = document.getElementById("albumSearchBar").value;  

    fetch("http://localhost:3000/getAlbumSR?albumSearchBar=" + albumInput.toString().toLowerCase(), { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
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
            const headerArray = ["TRACK ID", "TRACK NAME", "ARTIST ID", "ARTIST NAME", "ALBUM ID", "ALBUM NAME", "Tags", "DATE RECORDED", "DATE CREATED", "GENRES", "TRACK NUMBER", "DURATION"];

            for (let c = 0; c < headerArray.length; c++) {
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

