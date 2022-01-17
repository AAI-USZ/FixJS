function(pos){
		// determine the width of the new column
		newWidth = 100/(columns.length+1);
		subWidth = newWidth/columns.length || 0;
		// update the width of other columns
		for( var i = 0; i < columns.length; i++ ){
			columns[i].width -= subWidth;
			columns[i].style.width = columns[i].width+'%';
		};
		// add a new column to the DOM
		column = document.createElement('div');
		column.className = 'column';
		column.width = newWidth;
		column.style.width = newWidth+'%';
		column.addEventListener('click',
			function(e){
				var e = e || window.event;
				e.cancelBubble = true;
				e.stopPropagation && e.stopPropagation();
				if(selection){
					api.movePanel(selection,this,null);
					selection = null;
				}
			}, false);
		desk.insertBefore(column,pos);
		return column;
	}