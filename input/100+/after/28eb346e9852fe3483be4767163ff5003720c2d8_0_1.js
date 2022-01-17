function() {
		var idString = "#" + ASM.createSystemCellId({
			name : that.name
		});
		var cellDiv = $(idString);
		cellDiv.empty();
		var httpGetDiv = $(document.createElement('div'));
		httpGetDiv.addClass('displayGridCell');
		if (that.alive) {
			httpGetDiv.addClass('isAlive');
			httpGetDiv.attr('title', that.url);
		} else {
			httpGetDiv.addClass('isDead');
			if (that.data.ValidationError !== null && that.data.ValidationError !== undefined ){
				var msg = that.data.ValidationError;
				httpGetDiv.attr('title', msg);
			} 
		}
		httpGetDiv.text(that.name);
		
		httpGetDiv.appendTo(cellDiv);

	}