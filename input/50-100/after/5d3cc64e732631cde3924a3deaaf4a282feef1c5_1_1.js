function broken(name, selector) {
		try {
			jQuery(selector);
			ok( false, name + ": " + selector );
		} catch(e){
			ok( e.message.indexOf("Syntax error") >= 0,
				name + ": " + selector );
		}
	}