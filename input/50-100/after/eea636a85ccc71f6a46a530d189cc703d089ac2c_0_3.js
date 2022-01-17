function info(text, title){
				text = text || "(an empty string)";
				if(title) text = "<b>"+title+"</b><br/>" + text;
				counter[0]++;
				redrawCounter(0);
				//here adding to div and dTabs
				addMessage(text, 0);
			}