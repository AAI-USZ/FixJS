function(req, res) {
  res.render('index', { title: 'Gambit', rooms: Room.all() });
}