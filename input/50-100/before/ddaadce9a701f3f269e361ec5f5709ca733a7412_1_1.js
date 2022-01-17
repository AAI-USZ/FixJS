function () {

      it('should validate null', function () {
        return this.validator.validate(null, {'type': 'null'}).should.be.empty;
      });

      it('should not validate no-null', function () {
        return this.validator.validate('0', {'type': 'null'}).should.not.be.empty;
      });
    }