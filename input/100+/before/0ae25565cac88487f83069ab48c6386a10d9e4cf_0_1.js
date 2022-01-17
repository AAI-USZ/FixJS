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

    $("div.table_wrapper, div.modal_wrapper").on("click", ':checkbox', function (evt) {
      var $form = $(this).closest("form");
      var any_checked = $form.find("tbody :checkbox").is(":checked");

      // Enable the button if any checkbox is checked,
      // Disable if all checkbox is cleared
      if(any_checked) {
        $form.find(".table_actions button.btn-danger").removeClass("disabled");
      }else {
        $form.find(".table_actions button.btn-danger").addClass("disabled");
      }
    });
  }