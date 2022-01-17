function () {

    var arrayToFilter = [{key: 'value', other: 'other1'}, {key: 'value2', other: 'other2'}, {key: 'value', other: 'other3'}];

    expect(uniqueFilter(arrayToFilter, 'key')).toEqual([{ key : 'value', other : 'other1' }, { key : 'value2', other : 'other2' }]);

  }