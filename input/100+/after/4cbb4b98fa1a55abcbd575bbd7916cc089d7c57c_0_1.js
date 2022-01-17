function createGui(menuService, menu) {
	i18nContainer = "engineMenuText";
	var skin = menuService.skinNormal;

	// Apply the background image
	var bg = menu.createImage("data/image/GameOver.png", menuService.width, menuService.height);
	// Use the following scaling to keep aspect ratio on resize:
	// bg.setScaling(gdx.utils.Scaling.fit);
	menuService.addActor(bg);

	var w = menuService.createWindow(i18nText("gameovermenu.title"), skin);

	var quickload = new ui.TextButton(i18nText("gameovermenu.quickload"), skin);
	quickload.addListener(new ClickAdapter(
		function (actorEv, x, y) {
			if ($.quickLoad()) {
				menuService.changeState(MENU_STATE_IDLE);
			} else {
				menuService.showInfoFocused(i18nText("gameovermenu.loadfailed"));
			}
		}
	));
	w.row().fill(true, true).expand(true, false);
	w.add(quickload);

	var load = new ui.TextButton(i18nText("gameovermenu.load"), skin);
	load.addListener(new ClickAdapter(
		function (actorEv, x, y) {
			menuService.changeState(MENU_STATE_LOAD);
		}
	));
	w.row().fill(true, true).expand(true, false);
	w.add(load);


	var toTitle = new ui.TextButton(i18nText("gameovermenu.return"), skin);
	toTitle.addListener(new ClickAdapter(
		function (actorEv, x, y) {
			menuService.changeState(MENU_STATE_TITLE);
		}
	));
	w.row().fill(true, true).expand(true, false);
	w.add(toTitle);

	var exit = new ui.TextButton(i18nText("gameovermenu.exit"), skin);
	exit.addListener(new ClickAdapter(
		function (actorEv, x, y) {
			$.exit();
		}
	));
	w.row().fill(true, true).expand(true, false);
	w.add(exit);

	menuService.addActor(w);
	if (desktopMode) menuService.focus(quickload);
}