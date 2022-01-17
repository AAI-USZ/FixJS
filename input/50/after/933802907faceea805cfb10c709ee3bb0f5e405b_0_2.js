function() {
    spyOn(tablestats.model, 'fetch');
    tables.add({name: 'test'});
    expect(tablestats.model.fetch).toHaveBeenCalled();
  }