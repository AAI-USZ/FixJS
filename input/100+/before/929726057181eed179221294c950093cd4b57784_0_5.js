function buildBoardDiv(container, selector) {
		var 
			boardTd, pgnTd, descriptionsTd,
			table,
			controlsTd,
			flipper = createFlipper(),
			advance = advanceButton(),
			slider,
			fileLegend = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ''];

			
		slider = $('<div>', {'class': 'pgn-slider'})
			.slider({
				max: 60,
				min: 20,
				valign: 'middle',
				value: blockSize,
				stop: setWidth
			});
		table = $('<table>', {'class': 'pgn-table', border: 0, cellpadding: 0, cellspacing: 0}).appendTo(container);
		if (selector)	
			table.append($('<tr>').append($('<td>', {colspan: 10, 'class': 'pgn-selector'}).append(selector)));
		
		table.append($('<tr>').append(descriptionsTd = $('<td>', {colspan: 10, 'class': 'pgn-descriptions'})));
		table.append($('<tr>').append(controlsTd = $('<td>', {colspan: 10, 'class': 'pgn-controls'})));
		var tr = $('<tr>').appendTo(table);
		for (var i in fileLegend) 
			tr.append($('<td>', {'class': 'pgn-legend'}).text(fileLegend[i]));
		var blackSq = {height: 40, width: 40, 'class': 'pgn-game-square pgn-game-square-black'};
		var whiteSq = {height: 40, width: 40, 'class': 'pgn-game-square pgn-game-square-white'};
		
		for (var i = 0; i < 8; i++) { // create row i: legend, 8 
			tr = $('<tr>').appendTo(table);
			tr.append($('<td>', {'class': 'pgn-legend pgn-row'}).text(8 - i));
			for (var file = 0; file < 8; file++) {
				var td = $('<td>', (((i+file)%2) ? blackSq : whiteSq));
				if (!i && !file)
					boardTd = td; 
				tr.append(td);
			}
			tr.append($('<td>', {'class': 'pgn-legend pgn-row'}).text(8 - i));
		}
		tr = $('<tr>').appendTo(table);
		for (var i in fileLegend) 
			tr.append($('<td>', {'class': 'pgn-legend'}).text(fileLegend[i]));
		table.append($('<tr>').append(pgnTd = $('<td>', {colspan: 10, 'class': 'pgn-pgn-moves'})));
		controlsTd.css({textAlign: 'right'}).append(flipper).append(advance).append(slider);
		return {boardTd: boardTd, pgnTd: pgnTd, descriptionsTd: descriptionsTd};
	}