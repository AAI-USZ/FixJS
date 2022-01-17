function(text, title){
				text = text || "(an empty string)";
				if(title) text = "<b>"+title+"</b><br/>" + text;
				this.counter[2]++;
				this.bCount[2].remove();
				this.bCount[2] = paper.text(paper.width - 45, 11, this.counter[2]).attr({fill: "orange"});
				this.button.push(this.bCount[2]);
				if(this.bGlow) this.bGlow.remove();
				this.bGlow = this.buttonBG.glow(10, true).attr({fill : "#FFFF00"});
				this.mask.toFront();
				//here adding to div and dTabs
				this.addMessage(text, 2);
				//pulse
				var fade = function(o){
					if(o.buttonBG.attr("fill-opacity")==1){
						o.buttonBG.animate({"fill-opacity": 0.4}, 700);
					}else{
						o.buttonBG.animate({"fill-opacity": 1}, 700);
					}
				};
				if(this.animation) clearInterval(this.animation);
				this.animation = setInterval((function(that){
					return function(){
						fade(that);
					}
				})(this),750);
			}