function () {
      /**
       * Populate the input with the applicable field
       */
      this.$.nameField.setValue(this.getModel().get(this.getTitleField()));
    }