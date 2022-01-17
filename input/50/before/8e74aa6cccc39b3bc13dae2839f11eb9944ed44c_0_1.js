function (e, data) {
	    $(this).find("li[rel=test_case]").data("jstree", PLAN_CASE_MENU);
	    $(this).find("li[rel!=test_case]").data("jstree", {contextmenu:{}});
	}