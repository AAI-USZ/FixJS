function(req, res) {
  var artist_id = req.params.id;
  database.getArtist(artist_id, function(err, artist) {
    if(artist == undefined) {
      res.send(404);
      return;
    }
    database.getAlbumsByArtist(artist_id, function(err, albums) {
     res.render('artist', {title: artist.name, artist: artist, albums: albums});
    });
  });
}