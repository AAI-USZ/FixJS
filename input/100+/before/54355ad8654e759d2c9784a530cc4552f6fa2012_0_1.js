function () {
    it('should require the given plugin by name', function () {
      var square = new Square();

      expect(square.plugin('lint')).to.equal(true);
      expect(square.middleware).to.have.length(1);
    });

    it('should for the plugin in multiple locations', function () {
      var square = new Square({ 'disable log transport': true });
      square.on('error', noop); // throws an error other wise

      expect(square.plugin('plugin.fixture')).to.equal(false);

      // add the fixtures directory as possible option to search for plugins
      var square2 = new Square({ 'disable log transport': true });
      square2.paths.push(require('path').join(process.env.PWD, 'test/fixtures'));

      expect(square2.plugin('plugin.fixture')).to.equal(true);
      expect(square2.middleware).to.have.length(1);
    });

    it('should do the first initialization step of the plugin', function (done) {
      var square = new Square({ 'disable log transport': true });
      square.paths.push(require('path').join(process.env.PWD, 'test/fixtures'));

      square.on('plugin.fixture:init', function () {
        done();
      });

      square.plugin('plugin.fixture');
    });

    it('should proxy the configuration to the plugin', function (done) {
      var square = new Square({ 'disable log transport': true });
      square.paths.push(require('path').join(process.env.PWD, 'test/fixtures'));

      square.on('plugin.fixture:init', function (pluginoptions) {
        expect(pluginoptions).to.equal(options);
        done();
      });

      var options = { foo: 'bar' };
      square.plugin('plugin.fixture', options);
    });

    it('should merge the configuration with the supplied options', function (done) {
      var square = new Square();
      square.paths.push(require('path').join(process.env.PWD, 'test/fixtures'));
      square.package = {
          configuration: {
              plugins: {
                  'plugin.fixture': {
                      foo: 'bar'
                    , bar: 'foo'
                    , baz: 'afdasfas'
                  }
              }
          }
      };

      square.on('plugin.fixture:init', function (pluginoptions) {
        expect(pluginoptions).to.have.property('foo', 'choochoo');
        expect(pluginoptions).to.have.property('bar', 'foo');
        expect(pluginoptions).to.have.property('baz', 'afdasfas');

        done();
      });

      var options = { foo: 'choochoo' };
      square.plugin('plugin.fixture', options);
    });

    it('should log an critical error when it fails');
  }