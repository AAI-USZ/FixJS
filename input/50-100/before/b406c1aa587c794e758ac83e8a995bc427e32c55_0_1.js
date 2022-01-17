function () {

    var arrayToFilter = [{key: 'value'}, {key: 'value2'}, {key: 'value'}];

    expect(uniqueFilter(arrayToFilter, '')).toEqual([{key: 'value'}, {key: 'value2'}]);

  }