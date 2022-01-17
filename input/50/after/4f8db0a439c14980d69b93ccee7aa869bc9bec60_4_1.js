function(err, albums) {
     res.render('artist', {title: artist.name, artist: artist, albums: albums});
    }