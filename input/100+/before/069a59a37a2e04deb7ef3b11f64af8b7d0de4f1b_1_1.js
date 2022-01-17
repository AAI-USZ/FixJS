function(req, res) {

    var players = [];
    [1, 2, 3, 4].forEach(function (x) {
        var name = req.body['name' + x];
        var email = req.body['email' + x];
        console.log('name', name, 'email', email, 'params', req.params);
        if (name && email) {
            players.push({ name: name,
                           email: email,
                           key: makeKey() });
        }
    });

    console.log(players.length, 'players');
    var game = Game.create(req.body.language || 'German', players);

    res.redirect("/game/" + game.key + "/" + game.players[0].key);
}