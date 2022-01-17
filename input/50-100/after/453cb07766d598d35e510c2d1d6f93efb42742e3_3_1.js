function() {
		$("#select-disabled-enhancetest").selectmenu("enable").selectmenu("open");

		var menu = $(".ui-selectmenu").not( ".ui-selectmenu-hidden" );
		ok( menu.text().indexOf("disabled enhance test") > -1, "the right select is showing" );
	}