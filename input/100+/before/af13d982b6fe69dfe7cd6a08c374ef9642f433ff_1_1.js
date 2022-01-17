function() {
			var grid = $.phylo.domCache;	
			var str = "[";
			for(var i=0;i<grid.length;i++) {
				str+='"';
				for(var j=0;j<grid[0].length;j++) {
					if(grid[i][j] == "x") {
						str+="-";
					} else {
						str+= this.convertColor(grid[i][j].backgroundColor);
					}
				}
				str+='"';
				if(i<grid.length-2)
					str+=',';
			}
			return '{ "alignments" : '+str+']}';
		}