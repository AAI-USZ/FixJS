function() {

    var grouped = _.groupBy(this.cards, 'suit'); 

    _.each(grouped, function(cardList, index, list) {

      var sorted = _.sortBy(cardList, function(c) { return c.rank; });

      list[index] = sorted; 

    });

    var flattened = _.flatten(grouped);

    this.cards = flattened;

  }