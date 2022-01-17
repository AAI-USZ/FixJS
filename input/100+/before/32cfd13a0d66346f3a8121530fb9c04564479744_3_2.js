function(list){
			if(list){
				for(var i=0;i<list.length;i++)
					GoogleReader.markAllAsRead(list[i]);
			}									  
		}