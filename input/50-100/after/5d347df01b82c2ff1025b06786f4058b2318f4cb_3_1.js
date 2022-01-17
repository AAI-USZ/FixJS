function gbodyHover(e){
			var s  = g._getSrc(e);
			if(s.row){
				gbodyOut();
				/*baidu.array.each(baidu.dom.query("[rowindex="+s.rowIndex+"]",g.ref.gbody),function(row){
					baidu.dom.addClass(row,"hover");
				});*/
				baidu.dom.addClass(s.row,"hover");
				g.highLightedRow=s.rowIndex;
			}
		}