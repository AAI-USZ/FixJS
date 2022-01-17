function(){
				isComplete = true;
				isDelete = false;
				dom.byId("dlg_title").innerHTML = "Mark As Complete";
				dom.byId("dlg_text").innerHTML = "Are you sure you want to mark this item as complete?";
				show();
			}