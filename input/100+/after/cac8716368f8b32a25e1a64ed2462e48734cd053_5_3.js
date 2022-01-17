function (e) {
    e.preventDefault();
    var self = this;
    
    this._submitting = true;
    
    this.getInputs().prop('readOnly', true);
    
    var attributes =  {};
    var submit_attributes = {
      '_csrf': csrf
    };
    this.getInputs().each(function () {
      var $item = $(this);
      var name = $item.attr('name');
      var value = $item.val();
      if ($item.data('validate')) {
        attributes[name] = value;
      }
      submit_attributes[name] = value;
    });

    self.model.validation(attributes, function (valid) {
      
      if ( ! valid) {
        self.getInputs().prop('readOnly', false);
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
            self.getInputs().prop('readOnly', false);
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
            self.getInputs().prop('readOnly', false);
            self._submitting = false;
            self.model.trigger('saved', model);
          }
          
        });
      }
    });
  }