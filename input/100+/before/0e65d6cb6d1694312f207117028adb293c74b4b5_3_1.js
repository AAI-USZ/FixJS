function(){

  // wake up the monster
  ssd.Core.getInstance().synchInit();

  var newUserEvent = function() {
    // trigger new user event
    ssd.user.auth.events.runEvent('newUser');
  };

  var serv = ssd.Server2js.getInstance();

  // hook for authed user from server
  //serv.hook('102', ssd.user.auth.login, 50);

  // analytics
  serv.hook('analytics', ssd.metrics.init);

  // new user event
  serv.hook('121', newUserEvent);

  // metadata init call
  serv.hook('metadata', ssd.metadata.init);

  // Write permanent cookie request (first time ever visitor)
  serv.hook('25', ssd.web.cookies.writePermCook);

}