function (model, response) {
            response.handled = true;
            var data;
            if (response.responseText === 'Forbidden') {
              self.setError(null, 'csrf');
              data = {fields: []};
            } else {
              data = JSON.parse(response.responseText).data;
            }
            self.$inputs.prop('readOnly', false);
            var fields = data.fields;
            _.each(fields, function (val, key) {
              if (_.isArray(val) && val.length > 0) {
                var err = {};
                err[key] = val[0];
                self.model.trigger('error', model, err);
              }
            });
            self._submitting = false;
          }