function() {
    if (window.pageYOffset > p) {
      nav.addClass('floating');
      t.show();
    } else {
      nav.removeClass('floating');
      t.hide();
    }
  }