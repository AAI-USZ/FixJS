function() {
  it('small array', function() {
    var first = [1];
    var result = first.compare([1]);
    result.should.be.true;    
  });

  it('small array not equal', function() {
    var first = [1];
    var result = first.compare([2]);
    result.should.be.false;    
  });

  it('small array not equal different types', function() {
    var first = [1];
    var result = first.compare(['one']);
    result.should.be.false;    
  });

  it('small array not equal different lengths', function() {
    var first = [1, 2];
    var result = first.compare([1]);
    result.should.be.false;    
  });

  it('bigger array', function() {
    var first = [1, 2, 3, 4, 5, 6, 7];
    var result = first.compare([1, 2, 3, 4, 5, 6, 7]);
    result.should.be.true;    
  });
}