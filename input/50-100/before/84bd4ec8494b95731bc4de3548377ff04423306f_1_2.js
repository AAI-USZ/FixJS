function (e, data) {
	    $(this).find("li[rel=test_project]").data("jstree", ROOT_MENU);
	    $(this).find("li[rel=test_suite]").data("jstree", FOLDER_MENU);
	    $(this).find("li[rel=test_case]").data("jstree", LEAF_MENU);
	}