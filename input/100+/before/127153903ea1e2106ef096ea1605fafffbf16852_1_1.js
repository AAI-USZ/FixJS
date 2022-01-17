function(){
    var csv = commasep(row, headers, headerCount);
    var expected = 'a,2,3';
    assert.equal(csv,expected);
  }