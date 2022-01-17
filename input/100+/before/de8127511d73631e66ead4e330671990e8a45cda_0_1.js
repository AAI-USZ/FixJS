function(panel,column,pos){
		// update sizes of other rows
		rows = column.children;
		newHeight = 100/(rows.length+1);
		subHeight = newHeight/rows.length || 0;
		for( var i = 0; i < rows.length; i++ ){
			rows[i].height -= subHeight;
			rows[i].style.height = rows[i].height+'%';
		}
		// create and add new row to the DOM
		row = document.createElement('div');
		row.height = newHeight;
		row.style.height = newHeight+'%';
		row.panel = panel;
		row.appendChild(panel.element);
		column.insertBefore(row,pos);
	}