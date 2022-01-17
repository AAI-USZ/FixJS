function () {

    var arrayToFilter = [{key: 'value', other: 'other1'}, {key: 'value2', other: 'other2'}, {other: 'other1', key: 'value'}];

    expect(uniqueFilter(arrayToFilter)).toEqual([{key: 'value', other: 'other1'}, {key: 'value2', other: 'other2'}]);

  }