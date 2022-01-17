function(e){
				this.counter[2]++;
				this.bCount[2].remove();
				this.bCount[2] = paper.text(paper.width - 45, 11, this.counter[2]).attr({fill: "orange"})
				this.button.push(this.bCount[2]);
				if(this.bGlow) this.bGlow.remove();
				this.bGlow = this.buttonBG.glow(10, true).attr({fill : "#FF2900"});
				this.mask.toFront();
				//here adding to div
				var fade = function(o){
					if(o.buttonBG.attr("fill-opacity")==1){
						o.buttonBG.animate({"fill-opacity": 0.5}, 700);
					}else{
						o.buttonBG.animate({"fill-opacity": 1}, 700);
					}
				}
				this.animation = setInterval((function(that){
					return function(){
						fade(that);
					}
				})(this),750);
			}