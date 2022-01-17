function () {
    var date = new timezoneJS.Date(2011,9,28,12,44,22,172,'Etc/UTC');
    expect(date.getTime()).toEqual(1319805862172);
    expect(date.toString()).toEqual('2011-10-28 12:44:22');
    expect(date.toString('yyyy-MM-dd')).toEqual('2011-10-28');
  }