f	i18nContainer = "engineMenuText";

	var skin = menuService.skinNormal;
	var w = menuService.createWindow(i18nText("savemenu.title"), 
			-1, -1, 700, 480, skin).top();

	// ADVANCED LIST GENERATION: listSaveFiles(int cols, int emptyTailRows, int minRows)
	// var files = $.listSaveFiles(2, 1, 10);
	var files = $.listSaveFiles();
	var button;

	var quickSave = generateButton(i18nText("savemenu.quicksave"), files[0], skin, menu);
	quickSave.addListener(new ClickAdapter(
		function (actorEv, x, y) {
			if ($.quickSave()) {
				menuService.resumeLastState();
			} else {
				menuService.showInfoFocused(i18nText("savemenu.savefailed"));
			}
		}
	));
	w.row().fill(true, true).expand(true, false).padBottom(10);
	w.add(quickSave).colspan(4);

	button = new ui.TextButton(i18nText("savemenu.cancel"), skin);
	button.addListener(new ClickAdapter(
		function (actorEv, x, y) {
			return menuService.resumeLastState();
		}
	));
	w.add(button).colspan(2);

	var failedText = i18nText("savemenu.savefailed");
	var buttonText = i18nText("savemenu.save");
	/* Use this loop if you prefer a "normal" top down menu for your game
	for (var i = 1; i < files.length;) {
		w.row().fill(true, true).expand(true, false).colspan(3);
		for (var j = 0; j < 2; j++, i++) {
			button = generateButton("Save "+i, files[i], skin, menu);
			button.addListener(new ClickAdapter(
				 "if ($.saveFile("+i+")) { "
	*/
	for (var i = files.length-1; i > 0;) {
		w.row().fill(true, true).expand(true, false).colspan(3);
		for (var j = 2; j >= 0; j-=2, i--) {
			var index = (i+1-j);
			button = generateButton(buttonText+" "+index, files[index], skin, menu);
			button.addListener(new ClickAdapter(
				 "if ($.saveFile("+index+")) { "
				+"	$.serviceProvider.getService(\"menu\").resumeLastState(); "
				+"} else { "
				+"	$.serviceProvider.getService(\"menu\").showInfoFocused(\""+failedText+"\"); "
				+"} "
			));
			w.add(button);
		}
	}

	menuService.addActor(w);
	if (desktopMode) menuService.focus(quickSave);
}
