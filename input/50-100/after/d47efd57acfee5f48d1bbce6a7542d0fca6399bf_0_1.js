function(wrapper) {
		var w = wn.pages.users;
		wn.ui.make_app_page({
			parent: w,
			title: "Users",
			single_column: true
		});
		w.profiles = {};
		w.refresh();
		w.setup();
		w.role_editor = new erpnext.RoleEditor();
	}