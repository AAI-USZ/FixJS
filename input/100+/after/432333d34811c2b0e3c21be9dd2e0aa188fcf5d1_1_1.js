function () {
    it('should not validate', function () {
      this.validator.validate(
        {'name':'test', 'lines': [1]},
        {
          'type': 'object',
          'properties': {
            'name': {'type': 'string'},
            'lines': {
              'type': 'array',
              'items': {'type': 'string'}
            }
          }
        }
      ).should.be.false;
      this.validator.errors.should.have.length(1);
      this.validator.errors[0].should.have.property('validator', 'type');
      this.validator.errors[0].should.have.property('message', 'is not string');
      this.validator.errors[0].should.have.property('property', 'lines');
    });
  }