function(err, model, created) {
          var a, alias, b, contents, _results;
          assert.equal(err, null);
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