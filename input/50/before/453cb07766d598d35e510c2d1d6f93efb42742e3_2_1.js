function(){
		var undefClass = $(".ui-page").find("[class*='undefined']");

		ok( undefClass.length == 0 );
	}