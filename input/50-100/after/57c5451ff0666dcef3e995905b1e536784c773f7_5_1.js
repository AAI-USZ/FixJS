function(id){
			if(id =="logoutbtn"){
				pokki.rpc('pokki.openPopup()');
				pokki.rpc('showLogoutPopup()');
				GoogleReader.logout();
				pokki.resetContextMenu();
			}else if(id == "markallasread") {
				BackgroundWorker.markAllAsRead();
			}
		}