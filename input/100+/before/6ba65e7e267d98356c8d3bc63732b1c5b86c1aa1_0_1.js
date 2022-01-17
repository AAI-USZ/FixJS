function() {
      var that = this;

      var validationResult = this.editor.validate();
      if (validationResult) {
      } else {
        this.$modal.modal("hide");
        var formResult = this.editor.getValue();
        if (this.model.isNew()) {
          this.model.set(formResult, { silent: true });
          this.widgetCollection.create(this.model);
        } else {
          this.model.save(formResult, { success: function() {
            that.dashboard.trigger("widget:changed", that.model);
          }});
        }
      }

      return false;
    }