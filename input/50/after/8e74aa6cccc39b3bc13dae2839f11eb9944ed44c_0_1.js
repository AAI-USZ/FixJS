function (e, data) {
	    $("li[rel=test_case],li[rel=test_suite]", this).data("jstree", PLAN_CASE_MENU);
	    $("li[rel=test_project]", this).data("jstree", {contextmenu:{}});
	}