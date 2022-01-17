f	i18nContainer = "engineMenuText";

	var skin = menuService.skinNormal;
	var w = menuService.createWindow(i18nText("loadmenu.title"), 
			-1, -1, 700, 480, skin).top();

	// ADVANCED LIST GENERATION: listSaveFiles(int cols, int emptyTailRows, int minRows)
	// var files = $.listSaveFiles(2, 1, 10);
	var files = $.listSaveFiles();
	var button;

	var quickLoad = generateButton(i18nText("loadmenu.quickload"), files[0], skin, menu);
	quickLoad.addListener(new ClickAdapter(
		function (actorEv, x, y) {
			if ($.quickLoad()) {
				menuService.changeState(MENU_STATE_IDLE);
			} else {
				menuService.showInfoFocused(i18nText("loadmenu.loadfailed"));
			}
		}
	));
	w.row().fill(true, true).expand(true, false).padBottom(10);
	w.add(quickLoad).colspan(4);

	button = new ui.TextButton(i18nText("loadmenu.cancel"), skin);
	button.addListener(new ClickAdapter(
		function (actorEv, x, y) {
			return menuService.resumeLastState();
		}
	));
	w.add(button).colspan(2);

	var failedText = i18nText("loadmenu.loadfailed");
	var buttonText = i18nText("loadmenu.load");
	/* Use this loop if you prefer a "normal" top down menu for your game
	for (var i = 1; i < files.length;) {
		w.row().fill(true, true).expand(true, false).colspan(3);
		for (var j = 0; j < 2; j++, i++) {
			button = generateButton("Load "+i, files[i], skin, menu);
			button.addListener(new ClickAdapter(
				 "if ($.loadFile("+i+")) { "
	*/
	for (var i = files.length-1; i > 0;) {
		w.row().fill(true, true).expand(true, false).colspan(3);
		for (var j = 2; j >= 0; j-=2, i--) {
			var index = (i+1-j);
			button = generateButton(buttonText+" "+index, files[index], skin, menu);
			button.addListener(new ClickAdapter(
				 "if ($.loadFile("+index+")) { "
				+"	$.serviceProvider.getService(\"menu\").changeState(MENU_STATE_IDLE); "
				+"} else { "
				+"	$.serviceProvider.getService(\"menu\").showInfoFocused(\""+failedText+"\"); "
				+"} "
			));
			w.add(button);
		}
	}

	menuService.addActor(w);
	if (desktopMode) menuService.focus(quickLoad);
}
