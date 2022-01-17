function(){
		localStorage.clear();
		delete localStorage.customIcon;
		chrome.browserAction.setIcon({path: 'icon.png'});
		dontLoad = true;
		customIconPreview.src = 'icon.png';
		alert(_m('extName') + ' has been reset.');
		location.reload();
	}