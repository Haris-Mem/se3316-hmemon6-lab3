const trackForm = document.getElementById("trackForm");

trackForm.addEventListener('submit', function (e) {

    const trackInput = document.getElementById("trackSearchBar").value;  

    fetch("http://localhost:3000/getTrackSR?trackSearchBar=" + trackInput.toString().toLowerCase(), { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(function(data){

        })
        .catch(err => console.log(err));
});

function populateTable(data) { 

    try {
        document.getElementById("table").remove();
    }
    catch (err) {
        console.log("Table cannot be removed because it doesnt exist!");
    }

    table.id = "table";
    table.className = "";

    const headerRow = document.createElement("tr");
    table.appendChild(headerRow);

    const headerFields = ["Track ID", "Track Name", "Artsit ID", "Artist Name", "Album ID", "Album Name", "Date Created", "Date Recorded", "Tags", "Genres", "Track Number", "Duration"];

    for (let c = 0; c < headerFields.length; c++) {
        const header = document.createElement("th");
        header.appendChild(document.createTextNode(headerFields[c]));
        headerRow.appendChild(header);
    }

    for (let c = 0; c < data.length; c++) {
        const tableRow = document.createElement("tr");
        table.appendChild(tableRow);
        for (let c2 = 0; c2 < 12; c2++) {
            const cell = document.createElement("td");
            //c9 out
            
            cell.appendChild(document.createTextNode(Object.values(data[c])[c2]));
            
            table.children.item(c + 1).appendChild(cell);
        }
    }
}

