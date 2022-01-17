function() {
    spyOn(tablestats, '_tableChange');
    tables.fetch();
    expect(tablestats._tableChange).toHaveBeenCalled();
  }