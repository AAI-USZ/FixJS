function (e, data) {
	    $("li[rel=test_project]", this).data("jstree", ROOT_MENU);
	    $("li[rel=test_suite]", this).data("jstree", FOLDER_MENU);
	    $("li[rel=test_case]", this).data("jstree", LEAF_MENU);
	}