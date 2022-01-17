function () {
      var square = new Square();

      expect(square.plugin('lint')).to.equal(true);
      expect(square.middleware).to.have.length(1);
    }