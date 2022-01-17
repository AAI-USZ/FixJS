function () {
    var services = Template.loginButtons.services();
    // xcxc this is wrong perhaps? (if you only have login/password)
    return (_.contains(services, 'password') || services.length > 2);
  }