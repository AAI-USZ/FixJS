function() {
      var tmpl;
      beforeEach(function() {
        tmpl = $filter('filterTmpl');
      });

      it('exist when provided', function() {
        expect(tmpl).toBeDefined();
      });
      
      it('return exactly what interesting thing the filter is doing to input', function() {
        expect(tmpl('text')).toEqual('text');
      });

    }