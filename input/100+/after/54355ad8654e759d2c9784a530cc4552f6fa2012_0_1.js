function (done) {
      var square = new Square({ 'disable log transport': true });
      square.on('error', noop); // throws an error other wise

      square.logger.on('critical', function (args) {
        expect(args[0]).to.have.string('plugin');
        done();
      });

      expect(square.plugin('plugin.fixture' + Math.random())).to.equal(false);
    }