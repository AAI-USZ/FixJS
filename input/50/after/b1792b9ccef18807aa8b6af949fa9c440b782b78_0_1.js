function(event) {
    $(this).prev('input[type=hidden]').val('1');
    $(this).closest('.well').hide();
    return event.preventDefault();
  }