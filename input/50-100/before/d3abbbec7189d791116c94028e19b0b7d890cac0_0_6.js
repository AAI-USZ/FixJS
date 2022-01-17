function() {
    var model = col.create({label: 'f'});
    equals(lastRequest[0], 'create');
    equals(lastRequest[1], model);
    equals(model.get('label'), 'f');
    equals(model.collection, col);
  }