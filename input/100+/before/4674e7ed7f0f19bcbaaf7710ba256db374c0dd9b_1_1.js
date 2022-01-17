f	expect(18);
	function broken(name, selector) {
		try {
			jQuery(selector);
			ok( false, name + ": " + selector );
		} catch(e){
			ok( typeof e === "string" && e.indexOf("Syntax error") >= 0,
				name + ": " + selector );
		}
	}

	broken( "Broken Selector", "[", [] );
	broken( "Broken Selector", "(", [] );
	broken( "Broken Selector", "{", [] );
	broken( "Broken Selector", "<", [] );
	broken( "Broken Selector", "()", [] );
	broken( "Broken Selector", "<>", [] );
	broken( "Broken Selector", "{}", [] );
	broken( "Doesn't exist", ":visble", [] );
	broken( "Nth-child", ":nth-child", [] );
	broken( "Nth-child", ":nth-child(-)", [] );
	broken( "Nth-child", ":nth-child(asdf)", [] );
	broken( "Nth-child", ":nth-child(2n+-0)", [] );
	broken( "Nth-child", ":nth-child(2+0)", [] );
	broken( "Nth-child", ":nth-child(- 1n)", [] );
	broken( "Nth-child", ":nth-child(-1 n)", [] );
	broken( "First-child", ":first-child(n)", [] );
	broken( "Last-child", ":last-child(n)", [] );
	broken( "Only-child", ":only-child(n)", [] );
});
