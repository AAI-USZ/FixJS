function () {
      // @TODO make this test pass on non unix platforms, as pwd and cd ~/ will
      // probably output something else on windows ;)
      var home = execSync('cd ~/ && pwd', { silent: true }).output.replace('\n', '');

      var square = new Square();
      expect(square.home).to.equal(home);
    }