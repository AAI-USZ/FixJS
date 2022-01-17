function(fieldId) {
      var field = this.$(fieldId);
      if(field.val().length == 0) {
        field.parent().parent().addClass('error');
        return false;
      }

      field.parent().parent().removeClass('error');
      return true;
    }