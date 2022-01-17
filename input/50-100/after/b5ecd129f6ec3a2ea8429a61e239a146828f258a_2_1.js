function (data, textStatus, jqXHR) {
  var modal;
  $('#modal_wrapper').append(data);
  $('.modal span.help-block').hide();
  modal = $('.modal:last');
  modal.modal();
  $(modal).trigger("new_modal", modal);
  return modal;
}