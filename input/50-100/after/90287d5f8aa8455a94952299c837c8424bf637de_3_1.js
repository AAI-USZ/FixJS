function() {
	require.config({
		paths : {
			/* Common libs */
			'jquery'				: 'lib/jquery-1.7.1.min',
			'order'					: 'lib/order',
			'underscore'			: 'lib/underscore-min',
			'transitions'			: 'plugin/bootstrap-transition',
			'collapse'				: 'plugin/bootstrap-collapse',
			'backbone'				: 'lib/backbone-min',
			'bootstrap'				: 'lib/bootstrap.min',
			'bootstrap-collapse'	: 'lib/plugin/bootstrap-collapse',
			'text'					: 'lib/text',
			'mustache'				: 'lib/requirejs.mustache',
			'marionette'			: 'lib/backbone.marionette.min',
			/* Testing libs */
			'mock-ajax'				: 'lib/mock-ajax',
			'fake-ajax'				: 'lib/jasmine-fake-ajax-0.3.4',
		}
	});
}