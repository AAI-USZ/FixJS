function updateCells() {
		var i;
		var headCell;
		var bodyCell;
		var date;
		var today = clearTime(new Date());
		for (i=0; i<colCnt; i++) {
			date = colDate(i);
			headCell = dayHeadCells.eq(i);
			headCell.html(formatDate(date, colFormat));
			for(var j = 0; j< kabinen.count; j++){
				var cnt = (kabinen.count * i) + j;
				bodyCell = dayBodyCells.eq(cnt);
				if (+date == +today) {
					bodyCell.addClass(tm + '-state-highlight fc-today');
				}else{
					bodyCell.removeClass(tm + '-state-highlight fc-today');
				}
				setDayID(headCell.add(bodyCell), date);
			}
			
		}
	}