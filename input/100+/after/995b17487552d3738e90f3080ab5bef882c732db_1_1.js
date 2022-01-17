function override_param(item){
  var param = $(item).closest('.control-group');
  var n = param.find('[id^=name_]').val();
  var v = param.find('[id^=value_]').val();

  param.closest('.tab-pane').find('.btn-success').click();
  var new_param = param.closest('.tab-pane').find('[id*=host_host_parameters]:visible').last().parent();
  new_param.find('[id$=_name]').val(n);
  new_param.find('[id$=_value]').val(v);
  mark_params_override();
}