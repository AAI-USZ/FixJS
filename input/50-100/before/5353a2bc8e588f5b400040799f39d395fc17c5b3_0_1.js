function(event) {
      $(this).closest("li").slideUp().parents("ul").children(":hidden").slideDown().first().find(":tabbable:first").focus();
      return false;
    }