function (key_code) {
	switch (key_code) {
		case sf.key.UP:
			if (focus == 0 && page_number == 0)
				break;
				
			blurElement(focus);
			if (focus == 0 && page_number > 0) {
				focus = 4;
				prevPage();
			} else {
				focus = focus - 1;
				focusElement(focus);
			}
			break;
		case sf.key.DOWN:
			if (focus == (stats_results.length -1) % 5 && page_number == Math.floor((stats_results.length - 1) / 5))
				break;
				
			blurElement(focus);
			if (focus == 4) {
				nextPage();
			} else {
				focus += 1;
				focusElement(focus);
			}
			break;
		case sf.key.PAUSE:
			$('#00_download_status').sfLabel('hide');
			httpGetSpecial(pause_url + stats_results[focus + page_number * 5][10]);
			$('#pause_image').sfImage('show');
			break;
		case sf.key.PLAY:
			$('#pause_image').sfImage('hide');
			httpGetSpecial(resume_url + stats_results[focus + page_number * 5][10]);
			$('#00_download_status').sfLabel('show');
			break;
		case sf.key.STOP:
			$('#popup_confirmation').sfPopup({
				text:"Are you sure you want to stop the selection?",
				buttons: ["Yes", "No"],
				defaultFocus: 1,
				keyhelp: {'return' : 'Return'},
				callback : function(selectedIndex) {
					 if (selectedIndex == 0) {
						httpGetSpecial(stop_url + stats_results[focus + page_number * 5][10]);
						if (focus == 0 && page_number > 0){
							prevPage();
						} else if (focus > 0) {
							focus -= 1;
							focusElement(focus);
						}
					}
				}
			}).sfPopup('show');
			break;
		case sf.key.REW:
			$('#popup_confirmation').sfPopup({
				text:"Are you sure you want to remove the selection?",
				buttons: ["Yes", "No"],
				defaultFocus: 1,
				keyhelp: {'return' : 'Return'},
				callback : function(selectedIndex) {
					 if (selectedIndex == 0) {
						httpGetSpecial(remove_url + stats_results[focus + page_number * 5][10]);
						if (focus == 0 && page_number > 0){
							prevPage();
						} else if (focus > 0) {
							focus -= 1;
							focusElement(focus);
						}
					}
				}
			}).sfPopup('show');
			break;
		case sf.key.RETURN:
			stopProgress();
			sf.scene.focus('Main');
			sf.key.preventDefault();
			break;
		default:
			break;
	}
}