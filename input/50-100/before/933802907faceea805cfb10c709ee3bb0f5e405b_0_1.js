function() {
    tables.add({name: 'test'});
    spyOn(tablestats, '_tableChange');
    tables.remove(tables.at(0));
    expect(tablestats._tableChange).toHaveBeenCalled();
  }