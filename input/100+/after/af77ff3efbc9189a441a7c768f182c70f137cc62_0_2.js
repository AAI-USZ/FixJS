function(text, title){
				text = text || "(an empty string)";
				if(title) text = "<b>"+title+"</b><br/>" + text;
				counter[2]++;
				bCount[2].remove();
				bCount[2] = paper.text(paper.width - 45, 11, counter[2]).attr({fill: "orange"});
				if(bGlow) bGlow.remove();
				bGlow = buttonBG.glow(10, true).attr({fill : "#FFFF00"});
				mask.toFront();
				//here adding to div and dTabs
				addMessage(text, 2);
				//pulse
				var fade = function(){
					if(buttonBG.attr("fill-opacity")==1){
						buttonBG.animate({"fill-opacity": 0.4}, 700);
					}else{
						buttonBG.animate({"fill-opacity": 1}, 700);
					}
				};
				if(animation) clearInterval(animation);
				animation = setInterval(fade, 750);
			}