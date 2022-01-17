function homepage(req, res) {
    res.render('index', {
        title: 'No WALL be here'
      , version: 'v2'
    });
}