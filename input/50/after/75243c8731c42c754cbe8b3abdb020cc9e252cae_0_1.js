function (e) {
    $('.button.dropdown').not(this).children('ul').removeClass('show-dropdown');
    $(this).children('ul').toggleClass('show-dropdown');
  }