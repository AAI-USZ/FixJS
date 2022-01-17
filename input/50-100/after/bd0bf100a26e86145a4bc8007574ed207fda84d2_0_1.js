function () {
    var button = $(this).find('[type="submit"]');
    if (button.length && !button.hasClass('always-enabled')){
      $(this).submit(function () {
        return false;
      });
      button.removeClass('primary').addClass('disabled');
      button.attr('disabled', 'disabled');
    }
    return true;
  }