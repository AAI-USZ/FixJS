function(newCards) {

    var cards = this.get('cards');

    console.debug("Before addCards cards size: " + cards.length);

    cards = cards.concat(newCards);

    console.debug("Before addCards cards size: " + cards.length);

    //TODO: why the unique?

    cards = _.uniq(cards, false, function(c) {

      return c.get('suit') + '_' + c.get('rank');

    });

    this.set({'cards': cards});

    console.debug("After addCards cards size: " + this.get('cards').length);

  }