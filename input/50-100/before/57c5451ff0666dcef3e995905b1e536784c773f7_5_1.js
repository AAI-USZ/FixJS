function(id){
			if(id =="logoutbtn"){
				GoogleReader.logout();
				pokki.resetContextMenu();
			}else if(id == "markallasread") {
				BackgroundWorker.markAllAsRead();
			}
		}