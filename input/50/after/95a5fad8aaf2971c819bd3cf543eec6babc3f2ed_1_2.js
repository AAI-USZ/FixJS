function(){
				isComplete = false;
				isDelete = true;
				dom.byId("dlg_title").innerHTML = "Delete";
				dom.byId("dlg_text").innerHTML = "Are you sure you want to delete this item?";
				show();
			}