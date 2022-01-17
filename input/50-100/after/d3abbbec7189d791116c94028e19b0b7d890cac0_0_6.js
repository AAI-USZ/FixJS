function() {
    var model = col.create({label: 'f'});
    equal(lastRequest[0], 'create');
    equal(lastRequest[1], model);
    equal(model.get('label'), 'f');
    equal(model.collection, col);
  }