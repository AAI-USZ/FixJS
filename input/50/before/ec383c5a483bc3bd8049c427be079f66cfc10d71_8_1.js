function(require, exports, module) {

  // Include the vegas application class
  var Vegas = require('Vegas');
  var Settings = require('Settings'); // @TODO: require settings.json instead.

  var settings =  new Settings();

  // Create a new vegas application instance
  var vegas = new Vegas(settings);

  debugger;

  return vegas;

}