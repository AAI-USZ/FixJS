function (evt) {
    form = $action.closest('form');
    form.append("<input type='hidden' name='" + $action.attr('name') + "' value='" + $action.attr('value') + "'/>");
    form.submit();
    modal.modal('hide');
    return false;
  }