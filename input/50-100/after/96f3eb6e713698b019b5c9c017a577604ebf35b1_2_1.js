function(req, res) {
  database.getArtists(function(err, artists) {
    if(err) {
      res.send(404);
      return;
    }
    res.render('artists', {title:'Artists', artists: artists});
  });
}