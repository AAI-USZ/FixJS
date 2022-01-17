function () {
    // Disable form button if checkbox are not checked
    $("form").each(function (i) {
      var checkboxes = $(this).find(":checkbox");
      if(!checkboxes.length) {
        // Do nothing if no checkboxes in this form
        return;
      }
      if(!checkboxes.filter(":checked").length) {
        $(this).find(".table_actions button.btn-danger").addClass("disabled");
      }
    });
  }