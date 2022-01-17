function(wrapper) {
		wn.pages.users.profiles = {};
		wn.pages.users.refresh();
		wn.pages.users.setup();
		wn.pages.users.role_editor = new erpnext.RoleEditor();
	}