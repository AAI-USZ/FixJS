function () {
      /**
       * Populate the input with the applicable field. If there's no model chosen
       * just leave the field blank.
       */
      var displayValue = this.getModel() ? this.getModel().get(this.getTitleField()) : "";
      this.$.nameField.setValue(displayValue);
    }