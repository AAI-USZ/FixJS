function commit_smartadd_form(event) {
  $(event.target).ajaxSubmit({
    success: reload_page,
    error: function(xhr){show_error_dialog(xhr.responseText);}
  });
  event.preventDefault();
  return false;
}