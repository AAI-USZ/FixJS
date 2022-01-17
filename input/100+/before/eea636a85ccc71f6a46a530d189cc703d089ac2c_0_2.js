function(){
				var prClass,
					num;
				for(var i = 0; i<3; i++){
					prClass = '.priority'+i;
					num = 0;
					$.each($(eId).find(prClass), function(){
						num++;
					});
					counter[i] = num;
					bCount[i].remove();
					bCount[i] = paper.text(paper.width - (125 - (i * 40)), 11, counter[i]).attr({fill: txtColors[i]});
					mask.toFront();
				}
			}