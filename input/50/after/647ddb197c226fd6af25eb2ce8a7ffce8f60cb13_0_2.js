function(value,key){ // Create Array of Organizations containing Array of Boards
			var list={};
			list.boards=value;
			list.name=(key!==""||key===null)?orgList[key][0].displayName:"Personal";
			return list;
		}