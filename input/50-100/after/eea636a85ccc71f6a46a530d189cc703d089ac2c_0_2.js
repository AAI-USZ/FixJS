function(priority){
				bCount[priority].remove();
				bCount[priority] = paper.text(paper.width - (125 - (priority * 40)), 11, counter[priority]).attr({fill: txtColors[priority]});
				mask.toFront();
			}