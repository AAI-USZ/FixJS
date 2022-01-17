function err(text, title){
				text = text || "(an empty string)";
				if(title) text = "<b>"+title+"</b><br/>" + text;
				counter[2]++;
				redrawCounter(2);
				if(bGlow) bGlow.remove();
				bGlow = buttonBG.glow(10, true).attr({fill : "#FFFF00"});
				//here adding to div and dTabs
				addMessage(text, 2);
				//pulse
				if(animation) clearInterval(animation);
				animation = setInterval(fade, 750);
			}