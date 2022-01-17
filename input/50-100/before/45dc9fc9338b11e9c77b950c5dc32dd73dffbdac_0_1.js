function(){
		riurikldr.loader()
		.queue('/static/engines/qunit/qunit.js')
		.queue('/static/engines/qunit/qunit.extentions.js')
		.then(function() {
			connect()
			riurik.trigger( "riurik.engine.inited" );
			next()
		});
	}