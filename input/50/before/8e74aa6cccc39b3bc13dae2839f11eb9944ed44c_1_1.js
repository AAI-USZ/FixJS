function (e, data) {
	    $(this).find("li[rel=test_case]").data("jstree", USER_ASSIGN_MENU);
	    $(this).find("li[rel!=test_case]").data("jstree", USER_ASSIGN_MENU);
	}