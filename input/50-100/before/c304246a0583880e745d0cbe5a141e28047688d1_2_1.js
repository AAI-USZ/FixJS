function(d) {
				return $('#checkboxHideData').attr('checked') != "checked"  && 
					(d.y+graph.baseLine) < graph.h &&
					d.x >= 0 &&
					d.x <= graph.w;
			}