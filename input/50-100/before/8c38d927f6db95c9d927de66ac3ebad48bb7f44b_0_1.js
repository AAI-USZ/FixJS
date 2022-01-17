function () {

  	// Create a DOM
  	jsdom = require('jsdom');

	// create a jQuery instance
	jQuery = require('jquery').create();
	global.jQuery = global.$ = jQuery;

	// Create window
	window = jsdom.jsdom().createWindow('<html><body></body></html>')

	// Set up global references for DOMDocument+jQuery
	global.document = window.document;
	global.jQuery = global.$ = jQuery

	// add addEventListener for coffeescript compatibility:
	global.addEventListener = window.addEventListener
}