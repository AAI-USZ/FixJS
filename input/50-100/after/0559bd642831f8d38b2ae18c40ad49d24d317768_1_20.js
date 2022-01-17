function commit_mainview_form(form, success_message, on_success_callback, on_error_callback) {
  $(form).ajaxSubmit({
    success: function(data, datatype){show_success_dialog(success_message, data, on_success_callback);},
    error: function(xhr){show_error_dialog(xhr.responseText, on_error_callback);}
  });
  return false;
}