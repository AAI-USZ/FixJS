function(){
					actionTaken = true;
					counter[priority]--;
					bCount[priority].remove();
					bCount[priority] = paper.text(paper.width - (125 - (priority * 40)), 11, counter[priority]).attr({fill: txtColors[priority]});
					mask.toFront();
					delId = "#console_row_"+nr;
					$(delId).remove();
				}