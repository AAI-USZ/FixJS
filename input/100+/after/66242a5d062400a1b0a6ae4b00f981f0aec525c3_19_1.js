function() {
      var calledSave;
      var model;

      setup(function() {
        calledSave = false;

        subject.save = function() {
          calledSave = true;
        }

        model = new Calendar.Models.Account({
          providerType: 'Local'
        });


        subject._createModel = function() {
          return model;
        }
      });

      test('result', function() {
        assert.isFalse(model.provider.useCredentials);
        assert.isFalse(model.provider.useUrl);

        subject.dispatch({ params: { preset: 'local'} });
        assert.isTrue(calledSave);
      });

    }