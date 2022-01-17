function(row){
		if(!this.layout._isCollapsable){
			this.inherited(arguments);
			return;
		}
		row.customClasses = (row.odd ? " dojoxGridRowOdd" : "") + (row.selected ? " dojoxGridRowSelected" : "") + (row.over ? " dojoxGridRowOver" : "");
		this.focus.styleRow(row);
		this.edit.styleRow(row);
	}