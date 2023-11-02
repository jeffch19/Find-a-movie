var watchModeApiKey = 
var requestUrlWatchMode = 
var watchModeAddParameters = 
var searchButton = $('#searchBtn');

function getWatchModeLocation () {
    fetch('/Assets/title_id_map_watchmode.csv')
    .then(function (response){
        console.log(response)
        return response.text();
    })
    .then(function (data) {
        console.log(data)
        var lines = data.split("\n")
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            console.log(lines[i]);

        }
    })
    

}

searchButton.on("click", getWatchModeLocation)