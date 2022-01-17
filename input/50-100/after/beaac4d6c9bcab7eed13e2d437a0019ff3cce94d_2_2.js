function () {
      var square = new Square();
      expect(square.env).to.not.equal('whoopwhoop');

      var square2 = new Square({ env: 'whoopwhoop' });
      expect(square2.env).to.equal('whoopwhoop');
    }