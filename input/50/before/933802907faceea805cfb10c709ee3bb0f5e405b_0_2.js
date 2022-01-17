function() {
    spyOn(tablestats, '_tableChange');
    tables.add({name: 'test'});
    expect(tablestats._tableChange).toHaveBeenCalled();
  }