function (data, textStatus, jqXHR) {
  $('div.modal_wrapper').append(data);
  $('.modal span.help-block').hide();
  $('.modal:last').modal();

  horizon.datatables.validate_button();
}