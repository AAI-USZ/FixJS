function () {
      var square = new Square();
      expect(square.middleware).to.have.length(0);

      expect(square.use(noop)).to.equal(true);
      expect(square.middleware).to.have.length(1);

      // silent failure
      expect(square.use(noop)).to.equal(false);
      expect(square.middleware).to.have.length(1);
    }