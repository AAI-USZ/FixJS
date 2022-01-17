function (keyCode) {
	switch (keyCode) {
		case sf.key.RIGHT:
		case sf.key.ENTER:
			// Go to selected scene
			$('#background_image').sfImage('hide');
			var index = $('#scene_list').sfList('getIndex');
			sf.scene.show(this.data[index]);
			$('#scene_list').sfList('blur');
			$('#scene_list').sfList('hide');
			$('#label').sfLabel('hide');
			$('#app_layout').sfBackground(this.defaultOpts);
			sf.scene.focus(this.data[index]);
			break;
		
		case sf.key.UP:
			$('#scene_list').sfList('prev');
			break;
		
		case sf.key.DOWN:
			$('#scene_list').sfList('next');
			break;
			
		case sf.key.RETURN:
			var _THIS_ = this;
			var exit = false;
			$('#popupExit').sfPopup({
					text:"Do you really want to exit the application?",
					buttons: ["Yes", "No"],
					defaultFocus: 1,
					keyhelp: {'return' : 'Return'},
					callback : function (selectedIndex){
						if (selectedIndex == 0) {
							exit = true;
						}
					}
			}).sfPopup('show');
			
			if (!exit)
				sf.key.preventDefault();
			else
				widgetApi.sendReturnEvent();
			break;
			
		default:
			break;
	}
}