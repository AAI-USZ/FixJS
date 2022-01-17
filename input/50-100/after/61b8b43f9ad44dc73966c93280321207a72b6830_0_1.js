function(i){
				this.counter[0]++;
				this.bCount[0].remove();
				this.bCount[0] = paper.text(paper.width - 125, 11, this.counter[0]).attr({fill: "white"});
				this.button.push(this.bCount[0]);
				this.mask.toFront();
				//here adding to div
			}