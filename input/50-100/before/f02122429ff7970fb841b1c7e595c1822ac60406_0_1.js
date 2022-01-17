function() {
      var r = new Collection({
        properties: {
          title: {
            type: 'string',
            required: true
          },
          age: {
            type: 'number',
            required: true
          },
          created: {
            type: 'date'
          }
        }
      });
      
      var errs = r.validate({title: 7, created: 'foo'});
      
      expect(errs).to.eql({title: 'must be a string', age: 'is required', created: 'must be a date'});
    }