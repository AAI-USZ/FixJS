function () {
      var square = new Square();

      square.use(noop);
      expect(square.middleware).to.have.length(1);

      // silent failure
      square.use(noop);
      expect(square.middleware).to.have.length(1);
    }