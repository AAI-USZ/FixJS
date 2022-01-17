function() {
    tables.add({name: 'test'});
    spyOn(tablestats.model, 'fetch');
    tables.remove(tables.at(0));
    expect(tablestats.model.fetch).toHaveBeenCalled();
  }