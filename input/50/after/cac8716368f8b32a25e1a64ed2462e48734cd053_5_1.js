function (model) {
            self.getInputs().prop('readOnly', false);
            self._submitting = false;
            self.model.trigger('saved', model);
          }