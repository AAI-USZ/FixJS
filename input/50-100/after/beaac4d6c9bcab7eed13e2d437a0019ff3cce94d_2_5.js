function () {
      var square = new Square({
          'log notification level': 1337
        , 'log level': 7331
        , 'disable log transport': true
      });

      expect(square.logger.level).to.equal(7331);
      expect(square.logger.notification).to.equal(1337);
      expect(square.logger.transports).to.have.length(0);
    }