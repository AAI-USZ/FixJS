function () {
      it('should validate an undefined instance', function () {
        this.validator.validate(undefined, {'type': 'number', 'required': true}).should.not.be.empty;
      });
    }