function(card, category) {
    var id = category + "_" + card.get('rank') + "_" + card.get('suit');
    return id;
  }