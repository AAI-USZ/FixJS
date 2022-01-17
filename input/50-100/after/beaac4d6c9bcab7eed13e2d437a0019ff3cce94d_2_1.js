function () {
      var backup = Square.prototype.configure;
      expect(Square.prototype.configure).to.be.an('function');

      Square.extend({
          configure: noop
      });

      expect(Square.prototype.configure).to.equal(noop);
      Square.prototype.configure = backup;
    }