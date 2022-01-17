function (model) {
            self.$inputs.prop('readOnly', false);
            self._submitting = false;
            self.model.trigger('saved', model);
          }