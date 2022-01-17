function () {
    var services = Template.loginButtons.services();

    // XXX this might probably change.
    return (_.contains(services, 'password') && services.length > 1)
      || services.length > 2;
  }