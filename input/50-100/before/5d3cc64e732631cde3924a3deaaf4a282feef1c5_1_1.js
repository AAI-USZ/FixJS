function broken(name, selector) {
		try {
			jQuery(selector);
			ok( false, name + ": " + selector );
		} catch(e){
			ok( typeof e === "string" && e.indexOf("Syntax error") >= 0,
				name + ": " + selector );
		}
	}