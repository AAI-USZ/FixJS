function(rows, cols) {
		var e, n, p;
		var x0 = 0;
		var cabins = 1;
		if(t.showKabinen == true){
			cabins = kabinen.count;
		}
		dayHeadCells.each(function(i, _e) {
			e = $(_e);
			n = e.offset().left;
			if(i>0){
				addCellsToArray(cols, x0, n, cabins);
			}
			x0 = n;
		});
		addCellsToArray(cols, x0, x0 + e.outerWidth(), cabins);
		if (opt('allDaySlot')) {
			e = allDayRow;
			n = e.offset().top;
			rows[0] = [n, n+e.outerHeight()];
		}
		var slotTableTop = slotContent.offset().top;
		var slotScrollerTop = slotScroller.offset().top;
		var slotScrollerBottom = slotScrollerTop + slotScroller.outerHeight();
		function constrain(n) {
			return Math.max(slotScrollerTop, Math.min(slotScrollerBottom, n));
		}
		for (var i=0; i<slotCnt; i++) {
			rows.push([
				constrain(slotTableTop + slotHeight*i),
				constrain(slotTableTop + slotHeight*(i+1))
			]);
		}
	}