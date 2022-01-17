function exp_add_edit_validate() {
    
    if ($('#add_edit_exp_pct_ID').val() == undefined)
      $('#exp_ext_form_add_edit_record .btn_ok').hide();
    else
      $('#exp_ext_form_add_edit_record .btn_ok').show();
}