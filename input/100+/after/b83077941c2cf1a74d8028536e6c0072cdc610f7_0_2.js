function disable() {
	if (manager) {
		manager = null;
	}

	Meta.keybindings_set_custom_handler('switch_windows', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
	Meta.keybindings_set_custom_handler('switch_group', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
	Meta.keybindings_set_custom_handler('switch_panels', Lang.bind(Main.wm, Main.wm._startA11ySwitcher));
	Meta.keybindings_set_custom_handler('switch_windows_backward', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
	Meta.keybindings_set_custom_handler('switch_group_backward', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
}