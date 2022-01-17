function enable() {
	if (!manager) {
		manager = new Manager.Manager();
	}

	Meta.keybindings_set_custom_handler('switch_windows', Lang.bind(manager, manager._startWindowSwitcher));
	Meta.keybindings_set_custom_handler('switch_group', Lang.bind(manager, manager._startWindowSwitcher));
	Meta.keybindings_set_custom_handler('switch_panels', Lang.bind(manager, manager._startWindowSwitcher));
	Meta.keybindings_set_custom_handler('switch_windows_backward', Lang.bind(manager, manager._startWindowSwitcher));
	Meta.keybindings_set_custom_handler('switch_group_backward', Lang.bind(manager, manager._startWindowSwitcher));
}