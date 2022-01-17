function () {
      var square = new Square({ stdout: true });
      expect(square.logger.level).to.equal(-1);

      square.stdout = false;
      expect(square.logger.level).to.be.above(-1);
    }