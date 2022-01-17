function(a, b){
			var aRowId = $(a).parent().prevAll('tr').length;
			var bRowId = $(b).parent().prevAll('tr').length;

			var aColId = $(a).prevAll('td, th').length;
			var bColId = $(b).prevAll('td, th').length;

			if(aRowId < bRowId){
				return -1; 
			}
			else if(aRowId > bRowId){
				return 1; 
			}
			//row id is equal
			else {
				//sort by column id
				if(aColId < bColId){
					return -1; 
				}
				if(aColId > bColId){
					return 1; 
				}
			}
		}