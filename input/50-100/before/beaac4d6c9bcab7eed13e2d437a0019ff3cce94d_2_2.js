function () {
      var square = new Square();
      expect(square.env).to.not.equal('whoopwhoop');

      var square2 = new Square({ env: 'whoopwhoop' });
      expect(square.env).to.equal('whoopwhoop');
    }