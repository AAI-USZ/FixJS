function() {
	COBA.removeEventListener(window, "load", COBA.init);
	setTimeout(function(){
	  if(gBrowser.currentURI.spec != "about:blank")
	    return;
    gBrowser.contentDocument.documentElement.focus();
  	window.focusAndSelectUrlBar()
  },800)

  /**
   * navigator.plugins方法将使得最新安装的插件可用，更新相关数组，如 plugins 数组，并可选重新装入包含插件的已打开文档。
   * 你可以使用下列语句调用该方法：
   * navigator.plugins.refresh(true)
   * navigator.plugins.refresh(false)
   * 如果你给定 true 的话，refresh 将在使得新安装的插件可用的同时，重新装入所有包含有嵌入对象(EMBED 标签)的文档。
   *如果你给定 false 的话，该方法则只会刷新 plugins 数组，而不会重新载入任何文档。
   * 当用户安装插件后，该插件将不会可用，除非调用了 refresh，或者用户关闭并重新启动了 Navigator。 
   */
  navigator.plugins.refresh(false);

	// 创建同步Cookie的plugin
	let item = document.createElementNS("http://www.w3.org/1999/xhtml", "html:embed");
	item.hidden = true;
	item.setAttribute("id", "coba-cookie-object");
	item.setAttribute("type", "application/coba");
	let mainWindow = document.getElementById("main-window");
	mainWindow.appendChild(item);
	
	COBA.hookCodeAll();
	COBA.addEventAll();
	COBA.updateAll();
	
	COBA.setupShortcut();
	COBA.setupUrlBar();
}