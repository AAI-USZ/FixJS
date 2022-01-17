function () {
    $('.itemWithPopover').popover('hide');
    
    var loggedIn = this.get('loggedIn');

    if (!loggedIn) {
      $.cookie('authorization', null);
      $.cookie('email', null);
      setFakeData();
    }
  }