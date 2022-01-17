function initMenu(menu) {
	var execScript = internalFile("data/script/engine/menu/titleMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript, true, true, true, false, false);
	handler.background = "data/image/Title.png";
	menu.putStateHandler(MENU_STATE_TITLE, handler);

	var execScript = internalFile("data/script/engine/menu/gameoverMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript, true, true, true, false, false);
	handler.background = "data/image/GameOver.png";
	menu.putStateHandler(MENU_STATE_GAMEOVER, handler);

	var execScript = internalFile("data/script/engine/menu/gameMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript, true, false, true, true, false);
	menu.putStateHandler(MENU_STATE_GAME, handler);

	var execScript = internalFile("data/script/engine/menu/idleMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript, false, false, true, false, true);
	menu.putStateHandler(MENU_STATE_IDLE, handler);

	var execScript = internalFile("data/script/engine/menu/pauseMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript, true, false, true, true, true);
	menu.putStateHandler(MENU_STATE_PAUSE, handler);

	var execScript = internalFile("data/script/engine/menu/loadMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript, true, false, false, true, true);
	menu.putStateHandler(MENU_STATE_LOAD, handler);

	var execScript = internalFile("data/script/engine/menu/saveMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript, true, false, false, true, true);
	menu.putStateHandler(MENU_STATE_SAVE, handler);

	var execScript = internalFile("data/script/engine/menu/changeLangMenu.js");
	var handler = new ridiculousRPG.ui.MenuStateScriptAdapter(execScript, true, false, false, true, true);
	menu.putStateHandler(MENU_STATE_CHANGELANG, handler);

	menu.setStartNewGameScript("data/script/game/startNewGame.js");
	menu.changeState(MENU_STATE_TITLE);
}