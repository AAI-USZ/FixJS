f		/* LOGGER v0.666
		* REQUIRED PARAMS: 
		* - paper (on which we will draw button opening the console)
		*/
		var h = paper.height,
			dId = "#console_" + pf,
			bPath = 'M'+ (paper.width - 170) + ' 0 Q' + (paper.width - 170) + ' 25 '
			 + (paper.width - 145) +' 25 L' + (paper.width - 45) + ' 25 Q' 
			 + (paper.width - 20) + ' 25 ' + (paper.width - 20) + ' 0 Z',
			//buttonBG = paper.rect(paper.width - 170, -25, 150, 50, 25).attr({
			buttonBG = paper.path(bPath).attr({
				fill : "#222",
				"fill-opacity": .75
			});
		//images
		var iImg = paper.image('images/info.png', paper.width - 152, 4, 15, 15),
			wImg = paper.image('images/warning.png', paper.width - 112, 4, 15, 15),
			eImg = paper.image('images/error.png', paper.width - 72, 4, 15, 15);
		//counters
		var iCounter = paper.text(paper.width - 125, 11, "0").attr({fill: "white"}),
			wCounter = paper.text(paper.width - 85, 11, "0").attr({fill: "yellow"}),
			eCounter = paper.text(paper.width - 45, 11, "0").attr({fill: "orange"});
		var buttonMask = paper.path(bPath).attr({
			fill : "#222",
			"fill-opacity": 0.0
		});
		//private variables
		var lId = dId,
			counter = [0, 0, 0],
			mask = buttonMask,
			bImgs = [iImg, wImg, eImg],
			bCount = [iCounter, wCounter, eCounter],
			buttonBG = buttonBG,
			bGlow = null,
			animation = null,
			curElCount = 0,
			actionTaken = false,
			colors = ['#FAFAFF','#FFFFE0','#FFFAFA'],
			txtColors = ['white','yellow','orange'],
			imgNames = ['info','warning','error'];
		//private functions
		var addMessage = function(message, priority){
			curElCount++;
			var divId = "console_row_" + curElCount;
			var divString = [];
			divString.push("<div id='");
			divString.push(divId);
			divString.push("' style='border-bottom: dashed #222; border-bottom-width: 1px; background-color:");
			divString.push(colors[priority]);
			divString.push("; padding: 2px;'>");
			divString.push("<table width='100%' style='table-layout: fixed;'><tr><td valign='top' style='width: 20px;'>");
			divString.push("<img src='images/");
			divString.push(imgNames[priority]);
			divString.push(".png' style='padding-left: 2px; padding-top: 3px;'/></td>");
			divString.push("<td valign='top' style='float: left;'>");
			divString.push(message);
			divString.push("</td><td valign='top' style='width: 20px;'><div id='cCancel_");
			divString.push(curElCount);
			divString.push("'><img src='images/cancel.png' style='padding-left: 2px; padding-top: 3px;'/></div></td></tr></table>");
			divString = divString.join("");
			$(divString).prependTo($(lId));
			var nr = curElCount;
			var delId = "#cCancel_"+curElCount;
			$(delId).click(function(){
				actionTaken = true;
				counter[priority]--;
				bCount[priority].remove();
				bCount[priority] = paper.text(paper.width - (125 - (priority * 40)), 11, counter[priority]).attr({fill: txtColors[priority]});
				mask.toFront();
				delId = "#console_row_" + nr;
				$(delId).remove();
			});
		};
		//console object
		var obj = {
			info : function(text, title){
				text = text || "(an empty string)";
				if(title) text = "<b>"+title+"</b><br/>" + text;
				counter[0]++;
				bCount[0].remove();
				bCount[0] = paper.text(paper.width - 125, 11, counter[0]).attr({fill: "white"});
				mask.toFront();
				//here adding to div and dTabs
				addMessage(text, 0);
			},
			warning : function(text, title){
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
			},
			error : function(text, title){
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
		};
		//event handling
		$(dId).click(function(){
			if(actionTaken){
				actionTaken = false;
			}else{
				$(dId).animate({
					height: 0
				});
			}
		});
		mask.click(function(){
			$(dId).animate({
				height: h
			});
		});
		mask.mouseover(function(){
			if(bGlow) bGlow.remove();
			if(animation) clearInterval(animation);
			buttonBG.animate({"fill-opacity": 0.75}, 500);
			bGlow = buttonBG.glow();
		});
		mask.mouseout(function(){
			bGlow.remove();
		});
		return obj;
	}
