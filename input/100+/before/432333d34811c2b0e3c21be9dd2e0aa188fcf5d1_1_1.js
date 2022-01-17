function () {
  beforeEach(function () {
    this.validator = new Validator();
  });

  describe('simple object with array', function () {
    it('should validate', function () {
      this.validator.validate(
        {'name':'test', 'lines': ['1']},
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
      ).should.be.true;
      this.validator.errors.should.have.length(0);
    });
  });

}