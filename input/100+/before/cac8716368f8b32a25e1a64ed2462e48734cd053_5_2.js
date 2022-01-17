function (valid) {
      
      if ( ! valid) {
        self.$inputs.prop('readOnly', false);
        self._submitting = false;
      } else {        
        self.model.set(submit_attributes);
        self.model.save(undefined, {        
          
          error: function (model, response) {
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
          },
          
          success: function (model) {
            self.$inputs.prop('readOnly', false);
            self._submitting = false;
            self.model.trigger('saved', model);
          }
          
        });
      }
    }