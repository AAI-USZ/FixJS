function warn(text, title){
				text = text || "(an empty string)";
				if(title) text = "<b>"+title+"</b><br/>" + text;
				counter[1]++;
				bCount[1].remove();
				bCount[1] = paper.text(paper.width - 85, 11, counter[1]).attr({fill: "yellow"});
				if(bGlow) bGlow.remove();
				bGlow = buttonBG.glow().attr({fill : "#FFFF00"});
				mask.toFront();
				//here adding to div and dTabs
				addMessage(text, 1);
			}