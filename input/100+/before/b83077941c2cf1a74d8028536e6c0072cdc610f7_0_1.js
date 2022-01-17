function enable() {
	if (!manager) {
		manager = new Manager.Manager();
	}

	Main.wm.setKeybindingHandler('switch_windows', Lang.bind(manager, manager._startWindowSwitcher));
	Main.wm.setKeybindingHandler('switch_group', Lang.bind(manager, manager._startWindowSwitcher));
	Main.wm.setKeybindingHandler('switch_panels', Lang.bind(manager, manager._startWindowSwitcher));
	Main.wm.setKeybindingHandler('switch_windows_backward', Lang.bind(manager, manager._startWindowSwitcher));
	Main.wm.setKeybindingHandler('switch_group_backward', Lang.bind(manager, manager._startWindowSwitcher));
}