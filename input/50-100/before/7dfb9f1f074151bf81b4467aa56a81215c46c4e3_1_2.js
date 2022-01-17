function () {

    beforeEach(function init() {
      foo = proxyquire.require('./samples/foo-without-require-override');
    });

    it('drinkUp returns stub', function () {
      foo.gotoBar().should.eql('keep it up');
    })

    it('drinksOnMe returns stub', function () {
      foo.throwRound().should.eql('you wish');  
    })
  }