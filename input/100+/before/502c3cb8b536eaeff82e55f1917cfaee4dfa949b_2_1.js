function(online) {
		
		var root = $('[data-root="true"]'),
		type = root.attr('data-control'),
		name = root.attr('data-name');
		if (typeof type === 'undefined' || typeof name === 'undefined') throw 'Root view not found';
		
		// remove root attribute
		root.removeAttr('data-root');
		
		// load view
		var c = ViewController.get(type);
		var controller = new c(null, root);
		
		controller.on('load', function() {	
			controller.show();
		});
		
		controller.load();
							
	}