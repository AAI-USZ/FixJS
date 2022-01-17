function getRandomSongFromDB(clbk) {
    var db = new sqlite3.Database('data/FR_charts.sqlite', sqlite3.OPEN_READONLY);
    var query = "SELECT * FROM Songs ORDER BY RANDOM() LIMIT 1";
    db.get(query, function(err, row){
        getTrack(row, clbk);
    });
    db.close();
}