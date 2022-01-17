function(text, title){
				text = text || "(an empty string)";
				if(title) text = "<b>"+title+"</b><br/>" + text;
				counter[0]++;
				bCount[0].remove();
				bCount[0] = paper.text(paper.width - 125, 11, counter[0]).attr({fill: "white"});
				mask.toFront();
				//here adding to div and dTabs
				addMessage(text, 0);
			}