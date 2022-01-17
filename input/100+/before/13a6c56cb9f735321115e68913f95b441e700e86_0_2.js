function (err, data) {
        if (err) throw err;
        var cards = data;
        var title = 'All your assigned cards';

        if (typeof type != 'undefined') {
            if (type === 'date') {
                // get only the cards that have a due date
                title = 'All your assigned cards with a due date';
                cards = [];
                for (var i = 0; i < data.length; i++) {
                    var card = data[i];
                    if (card.badges.due !== null) cards.push(card);
                }
            }
            else {
                res.status(404);
                res.render('404');
            }
        }

        res.render('cards', { title: title, cards: cards });
    }