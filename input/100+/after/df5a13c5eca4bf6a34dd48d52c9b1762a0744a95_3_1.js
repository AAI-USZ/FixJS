function() {
  horizon.datatables.validate_button();

  // Bind the "select all" checkbox action.
  $('div.table_wrapper, #modal_wrapper').on('click', 'table thead .multi_select_column :checkbox', function(evt) {
    var $this = $(this),
        $table = $this.closest('table'),
        is_checked = $this.prop('checked'),
        checkboxes = $table.find('tbody :checkbox');
    checkboxes.prop('checked', is_checked);
  });

  // Enable dangerous buttons only if one or more checkbox is checked.
  $("div.table_wrapper, #modal_wrapper").on("click", ':checkbox', function (evt) {
    var $form = $(this).closest("form");
    var any_checked = $form.find("tbody :checkbox").is(":checked");
    if(any_checked) {
      $form.find(".table_actions button.btn-danger").removeClass("disabled");
    }else {
      $form.find(".table_actions button.btn-danger").addClass("disabled");
    }
  });

  // Trigger run-once setup scripts for tables.
  horizon.datatables.add_table_checkboxes($('body'));
  horizon.datatables.set_table_sorting($('body'));
  horizon.datatables.set_table_filter($('body'));

  // Also apply on tables in modal views.
  horizon.modals.addModalInitFunction(horizon.datatables.add_table_checkboxes);
  horizon.modals.addModalInitFunction(horizon.datatables.set_table_sorting);
  horizon.modals.addModalInitFunction(horizon.datatables.set_table_filter);

  horizon.datatables.update();
}