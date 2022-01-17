function (err, data) {
        var cards = [];
        for (var i = 0; i < data.length; i++) {
            var card = data[i];
            utils.formatDueDate(card);
            if (card.labels.length > 0) {
                for (var o = 0; o < card.labels.length; o++) {
                    if (card.labels[o].name == label)
                        cards.push(card);
                }
            }
        }

        res.render('cardsbylabel', { label: label, cards: cards });
    }