function( next ){
	riurik.trigger( "riurik.engine.initing" );
	
	riurikldr.loader()
	.queue('/static/engines/qunit/qunit.html.js')
	.queue('/static/engines/qunit/qunit.js')
	.queue('/static/engines/qunit/qunit.extentions.js')
	.then(function() {
		connect()
		riurik.trigger( "riurik.engine.inited" );
		next()
	});

	load_remote_style('/static/engines/qunit/qunit.css');
}