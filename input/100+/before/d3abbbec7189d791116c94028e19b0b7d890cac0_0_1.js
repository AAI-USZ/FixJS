function() {
    var col = new Backbone.Collection();
    col.add([
      {id : 0, name : 'one'},
      {id : 1, name : 'two'}
    ]);
    var one = col.get(0);
    equals(one.get('name'), 'one');
    one.set({id : 101});
    equals(col.get(0), null);
    equals(col.get(101).get('name'), 'one');
  }