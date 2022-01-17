function () {
      var square = new Square();

      square.middleware.push(noop);
      expect(square.has(noop)).to.equal(true);
    }