function(){
		DbManager.initialise();
		pokki.addEventListener('context_menu',function(id){
			if(id =="logoutbtn"){
				GoogleReader.logout();
				pokki.resetContextMenu();
			}else if(id == "markallasread")
			{
				BackgroundWorker.markAllAsRead();
			}
		});
			if(window.localStorage.getItem("isSyncOn") && window.localStorage.getItem("isSyncOn")=="true")
			{	
				console.log("Updating from google");
				BackgroundWorker.updateFromGoogle();
			}
		}