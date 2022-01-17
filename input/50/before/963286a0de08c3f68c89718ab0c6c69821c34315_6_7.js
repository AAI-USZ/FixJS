function ts_add_edit_validate() {
    
    if ($('#add_edit_zef_pct_ID').val() == undefined ||
        $('#add_edit_zef_evt_ID').val() == undefined)
      $('#ts_ext_form_add_edit_record .btn_ok').hide();
    else
      $('#ts_ext_form_add_edit_record .btn_ok').show();
}