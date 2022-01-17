function(model, created) {
          var a, alias, b, contents, _results;
          assert.isObject(model);
          assert.isObject(created);
          _results = [];
          for (alias in model) {
            contents = model[alias];
            a = created[alias];
            b = contents;
            _results.push(assert.equal(a, b));
          }
          return _results;
        }