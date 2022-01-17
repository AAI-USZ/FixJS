function (index) {
		// For performance, store last selected item once in a local variable rather than looking it up
		// everytime matchIndex is called
 		if (typeof this.selectedItem === 'undefined')
                	this.selectedItem = $("#" + elementid + " option:selected");
            	if (this.selectedItem.length > 1) {
                	for (var i = 0; i < this.selectedItem.length; i++) {
	                    	if (index == this.selectedItem[i].index) {
	                        	return true;
	                    	};
                	};
		} else if (this.selectedItem.length == 1) {
			if (this.selectedItem[0].index == index) {
			    return true;
			};
		};
		return false;
	}