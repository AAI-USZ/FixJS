function(i, _e) {
			e = $(_e);
			n = e.offset().left;
			if(i>0){
				addCellsToArray(cols, x0, n, cabins);
			}
			x0 = n;
		}