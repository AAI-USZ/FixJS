function() {
  // Bind event handlers to confirm dangerous actions on tables.
  $("body").on("click", "form button.btn-danger", function (evt) {
    horizon.datatables.confirm(this);
    evt.preventDefault();
  });

  $('div.table_wrapper, div.modal_wrapper').on('click', 'table thead .multi_select_column :checkbox', function(evt) {
    var $this = $(this),
        $table = $this.closest('table'),
        is_checked = $this.prop('checked'),
        checkboxes = $table.find('tbody :checkbox');
    checkboxes.prop('checked', is_checked);
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

  horizon.datatables.add_table_checkboxes($('body'));
  horizon.datatables.set_table_sorting($('body'));
  horizon.datatables.set_table_filter($('body'));

  // Also apply on tables in modal views
  $('div.modal_wrapper').on('shown', '.modal', function(evt) {
    horizon.datatables.add_table_checkboxes(this);
    horizon.datatables.set_table_sorting(this);
    horizon.datatables.set_table_filter(this);
  });

  horizon.datatables.update();
}