function(row) {
          console.log(row)
          expect(row.content.toLowerCase().indexOf('foo')).not.toEqual(-1)
        }