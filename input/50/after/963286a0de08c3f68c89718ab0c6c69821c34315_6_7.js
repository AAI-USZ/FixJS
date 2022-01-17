function ts_add_edit_validate() {
    
    if ($('#add_edit_timeSheetEntry_projectID').val() == undefined ||
        $('#add_edit_timeSheetEntry_activityID').val() == undefined)
      $('#ts_ext_form_add_edit_timeSheetEntry .btn_ok').hide();
    else
      $('#ts_ext_form_add_edit_timeSheetEntry .btn_ok').show();
}