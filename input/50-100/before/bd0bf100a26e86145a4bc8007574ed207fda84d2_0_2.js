function () {
    $(this).submit(function () {
        return false;
    });
    $('input:submit').removeClass('primary').addClass('disabled');
    $('input:submit').attr('disabled', 'disabled');
    return true;
  }