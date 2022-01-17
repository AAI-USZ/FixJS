function(err, albums) {
     res.render('artist', {title: artist.name, name: artist.name, albums: albums});
    }