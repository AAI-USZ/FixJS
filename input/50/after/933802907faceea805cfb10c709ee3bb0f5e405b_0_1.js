function() {
    spyOn(tablestats.model, 'fetch');
    tables.reset([{name: 'test'}]);
    expect(tablestats.model.fetch).toHaveBeenCalled();
  }