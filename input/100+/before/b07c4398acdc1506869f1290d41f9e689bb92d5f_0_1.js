function(decks) {
  decks = _.toArray(decks);
  if (decks.length < 1) {
    return decks;
  }
  var lises = [],
    new_lises,
    deck,
    partial_lis,
    partial_lis_extended,
    x;
  for (var i=0; i < decks.length; i++) {
    new_lises = [];
    deck = decks[i];
    for (var j=0; j < lises.length; j++) {
      partial_lis = lises[j];
      partial_lis_extended = false;
      for (var k=0; k < deck.length; k++) {
        x = deck[k];
        if (x > _.last(partial_lis)) {
          new_partial_lis = partial_lis.slice(0); // dummy copy
          new_partial_lis.push(x);
          new_lises.push(new_partial_lis);
          partial_lis_extended = true;
        }
      }
      if (!partial_lis_extended) {
        // The longest subsequence might start at this deck
        new_lises.push(partial_lis);
      }
    }
    for (k=0; k < deck.length; k++) {
      new_lises.push([deck[k]]);
    }
    lises = new_lises;
  }
  lis_length = _.max(_.map(lises, function(item) { return item.length; }));
  lises = _.select(lises, function(item) { return item.length >= lis_length; });
  return lises;
}