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
		} else {
			httpGetDiv.addClass('isDead');
		}
		httpGetDiv.text(that.name);
		httpGetDiv.attr('title', that.url);
		httpGetDiv.appendTo(cellDiv);

	}