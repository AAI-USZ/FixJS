function initMenu(menu) {
	var execScript = internalFile("data/script/engine/menu/titleMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript,
			MENU_STATE_TITLE, true, true, true, false, false);
	menu.putStateHandler(handler);

	var execScript = internalFile("data/script/engine/menu/gameoverMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript,
			MENU_STATE_GAMEOVER, true, true, true, false, false);
	menu.putStateHandler(handler);

	var execScript = internalFile("data/script/engine/menu/gameMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript,
			MENU_STATE_GAME, true, false, true, true, false);
	menu.putStateHandler(handler);

	var execScript = internalFile("data/script/engine/menu/idleMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript,
			MENU_STATE_IDLE, false, false, true, false, true);
	menu.putStateHandler(handler);

	var execScript = internalFile("data/script/engine/menu/pauseMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript,
			MENU_STATE_PAUSE, true, false, true, true, true);
	menu.putStateHandler(handler);

	var execScript = internalFile("data/script/engine/menu/loadMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript,
			MENU_STATE_LOAD, true, false, false, true, true);
	menu.putStateHandler(handler);

	var execScript = internalFile("data/script/engine/menu/saveMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript,
			MENU_STATE_SAVE, true, false, false, true, true);
	menu.putStateHandler(handler);

	var execScript = internalFile("data/script/engine/menu/changeLangMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript,
			MENU_STATE_CHANGELANG, true, false, false, true, true);
	menu.putStateHandler(handler);

	menu.setStartNewGameScript("data/script/game/startNewGame.js");
	menu.changeState(MENU_STATE_TITLE);
}