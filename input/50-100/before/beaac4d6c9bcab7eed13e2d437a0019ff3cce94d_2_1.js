function () {
      expect(Square.prototype.configure).to.be.an('function');

      var backup = Square.prototype.configure;

      function noop() { /* dummy function*/ }

      Square.extend({
          configure: noop
      });

      expect(Square.prototype.configure).to.equal(noop);
      Square.prototype.configure = backup;
    }