function(id){
			if(id =="logoutbtn"){
				pokki.rpc('pokki.openPopup()');
				GoogleReader.logout();
				pokki.removeIconBadge();
				pokki.rpc('showLogoutPopup()');
				pokki.resetContextMenu();
			}else if(id == "markallasread") {
				BackgroundWorker.markAllAsRead();
			}
		}