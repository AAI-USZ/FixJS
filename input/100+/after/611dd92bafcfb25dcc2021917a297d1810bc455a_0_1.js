function(text, title){
				text = text || "(an empty string)";
				if(title) text = "<b>"+title+"</b><br/>" + text;
				this.counter[1]++;
				this.bCount[1].remove();
				this.bCount[1] = paper.text(paper.width - 85, 11, this.counter[1]).attr({fill: "yellow"});
				this.button.push(this.bCount[1]);
				if(this.bGlow) this.bGlow.remove();
				this.bGlow = this.buttonBG.glow().attr({fill : "#FFFF00"});
				this.mask.toFront();
				//here adding to div and dTabs
				this.addMessage(text, 1);
			}