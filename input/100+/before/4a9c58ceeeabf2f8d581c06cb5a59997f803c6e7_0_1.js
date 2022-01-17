function(e) {
      var link = e.currentTarget;
      var assoc   = $(link).attr('data-association');            // Name of child
      var assocType = $(link).attr('data-association-type');     // Type of association

      var hiddenField = $(link).prev('input[type=hidden]');
      hiddenField.val('1');
      var field = $(link).closest('.fields');
      field.hide();
      $(link).closest("form").trigger({ type: 'nested:fieldRemoved', field: field });

      if (assocType == 'has_one') {
        $(link).closest("a.add_nested_fields")
        field.siblings(".add_nested_fields[data-association='"+assoc+"']").show();
      }

      return false;
    }