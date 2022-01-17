function (evt) {
    var $form = $(this).closest("form");
    var any_checked = $form.find("tbody :checkbox").is(":checked");
    // Enable the button if any checkbox is checked,
    // Disable if all checkbox is cleared
    if(any_checked) {
      $form.find(".table_actions button.btn-danger").removeClass("disabled");
    }else {
      $form.find(".table_actions button.btn-danger").addClass("disabled");
    }
  }