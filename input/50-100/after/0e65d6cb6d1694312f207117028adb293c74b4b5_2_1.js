function() {
  var logger = goog.debug.Logger.getLogger('showcase.init');

  logger.info('Starting...');

  var jCombo = $('#comboBox');
  if (!jCombo.length)
    return;
  // showcase.so = new showcase.widget.showObject({
  //   comboBox: jCombo,
  //   displayBox: $('#showObjects')
  // });

  // showcase.so.addObject('userObject', 'The user data object', 'ss.user.getUserDataObject()', ss.user.getUserDataObject);
  // showcase.so.addObject('userDummyObject', 'A dummy user data object', 'ss.user.getDummyObject()', ss.user.getDummyObject);

  // showcase.so.render();

  // Interface with ss
  ss.config.set('user.auth.performLocalAuth', true);
  ss.config.set('user.auth.ext.fb.app_id', '186392014808053');
  ss.config.set('user.auth.ext.fb.permissions', 'email,publish_stream');

  ss.init();

}