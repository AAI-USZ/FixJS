function expense_add_edit_validate() {
    
    if ($('#add_edit_expense_project_ID').val() == undefined)
      $('#expenses_ext_form_add_edit_record .btn_ok').hide();
    else
      $('#expenses_ext_form_add_edit_record .btn_ok').show();
}