function initLogger(paper){
		/* juniLOGGER v1.1
		* REQUIRED PARAMS: 
		* - paper (on which we will draw button opening the console)
		*/
		var h = paper.height,
			lId = "#console_" + pf,
			eId = "#console_entries_" + pf,
			bPath = 'M'+ (paper.width - 170) + ' 0 Q' + (paper.width - 170) + ' 25 '
			 + (paper.width - 145) +' 25 L' + (paper.width - 45) + ' 25 Q' 
			 + (paper.width - 20) + ' 25 ' + (paper.width - 20) + ' 0 Z',
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
		//button mask
		var mask = paper.path(bPath).attr({
			fill : "#222",
			"fill-opacity": 0.0
		});
		//private variables
		var counter = [0, 0, 0],
			entries = [[],[],[]],
			state = [true, true, true],
			cCId = "#console_controller_"+pf,
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
				divString.push(";'>");
				divString.push("<table width='100%' style='table-layout: fixed;'><tr><td valign='top' style='width: 20px;'>");
				divString.push("<img src='images/");
				divString.push(imgNames[priority]);
				divString.push(".png' style='padding-left: 2px; padding-top: 3px;'/></td>");
				divString.push("<td valign='top' style='float: left;'>");
				divString.push(message);
				divString.push("</td><td valign='top' style='width: 20px;'><div id='cCheck_");
				divString.push(curElCount);
				divString.push("'><form><input type='checkbox'/></form></div></td><td valign='top' style='width: 20px;'><div id='cCancel_");
				divString.push(curElCount);
				divString.push("'><img src='images/cancel.png' style='padding-left: 2px; padding-top: 3px;'/></div></td></tr></table>");
				divString = divString.join("");
				$(divString).prependTo($(eId));
				entries[priority].push(curElCount);
				var delId = "#cCancel_"+curElCount;
				var checkId = "#cCheck_"+curElCount;
				var nr = curElCount;
				$(delId).click(function(){
					actionTaken = true;
					counter[priority]--;
					bCount[priority].remove();
					bCount[priority] = paper.text(paper.width - (125 - (priority * 40)), 11, counter[priority]).attr({fill: txtColors[priority]});
					mask.toFront();
					delId = "#console_row_"+nr;
					$(delId).remove();
				});
				$(checkId).click(function(){
					actionTaken = true;
				});
			},
			fade = function(){
				if(buttonBG.attr("fill-opacity")==1){
					buttonBG.animate({"fill-opacity": 0.4}, 700);
				}else{
					buttonBG.animate({"fill-opacity": 1}, 700);
				}
			},
			getScrollBarWidth = function() {
				var w = 0,
				outer = "<div id='scrollTest' style='overflow: scroll;'></div>";
				$('body').append(outer);
  				var el = document.getElementById('scrollTest');
  				w = el.offsetWidth - el.scrollWidth;
				$('#scrollTest').remove();
				return w;
			};
		//console object
		var obj = {
			info : function info(text, title){
				text = text || "(an empty string)";
				if(title) text = "<b>"+title+"</b><br/>" + text;
				counter[0]++;
				bCount[0].remove();
				bCount[0] = paper.text(paper.width - 125, 11, counter[0]).attr({fill: "white"});
				mask.toFront();
				//here adding to div and dTabs
				addMessage(text, 0);
			},
			warning : function warn(text, title){
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
			error : function err(text, title){
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
				if(animation) clearInterval(animation);
				animation = setInterval(fade, 750);
			}
		};
		//adding control bar
		var divString = [];
		divString.push("<div id='");
		divString.push("console_controller_"+pf);
		divString.push("' style='border-bottom: solid #222; border-bottom-width: 1px; background-color: white");
		divString.push("; height: 25px;'><table style='table-layout: fixed; width:");
		var w = $(lId).css('width');
		w = w.slice(0, w.length - 2);
		w = w - getScrollBarWidth();
		divString.push(w);
		divString.push("px;'><tr><td valign='top' style='float: left;'><b>Konsola</b></td>");
		divString.push("<td valign='top' style='width: 20px;'><div id='console_I'><img src='images/info.png' style='padding-left: 2px; padding-top: 3px;'/></div></td>");
		divString.push("<td valign='top' style='width: 20px;'><div id='console_W'><img src='images/warning.png' style='padding-left: 2px; padding-top: 3px;'/></div></td>");
		divString.push("<td valign='top' style='width: 20px;'><div id='console_E'><img src='images/error.png' style='padding-left: 2px; padding-top: 3px;'/></div></td>");
		divString.push("<td valign='top' style='width: 20px;'><div id='console_A'><form><input type='checkbox'/></form></div></td>");
		divString.push("<td valign='top' style='width: 20px;'><div id='console_D'><img src='images/cancel.png' style='padding-left: 2px; padding-top: 3px;'/></div></td>");
		divString.push("</tr></table>");
		divString = divString.join("");
		$(divString).prependTo($(lId));
		//event handling for console controller
		$('#console_I').click(function(){
			actionTaken = true;
			if(state[0]){
				$('#console_I').css('opacity',0.4);
				state[0] = false;
			}else{
				$('#console_I').css('opacity',1);
				state[0] = true;
			}
		});
		$('#console_W').click(function(){
			actionTaken = true;
			if(state[1]){
				$('#console_W').css('opacity',0.4);
				state[1] = false;
			}else{
				$('#console_W').css('opacity',1);
				state[1] = true;
			}
		});
		$('#console_E').click(function(){
			actionTaken = true;
			if(state[2]){
				$('#console_E').css('opacity',0.4);
				state[2] = false;
			}else{
				$('#console_E').css('opacity',1);
				state[2] = true;
			}
		});
		$('#console_A').click(function(){
			actionTaken = true;
		});
		$('#console_D').click(function(){
			actionTaken = true;
		});
		//main event handling (wypieprzyłem show-off, chyba wygląda lepiej)
		$(lId).click(function(){
			if(actionTaken){
				actionTaken = false;
			}else{
				$(lId).css('height',0);
			}
		});
		mask.click(function(){
			$(lId).css('height', h);
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
		//test
		obj.info("to jest testowe odpalenie konsoli","Test INFO");
		obj.warning("to jest testowe odpalenie konsoli","Test WARNING");
		obj.error("to jest testowe odpalenie konsoli","Test ERROR");
		obj.info("to jest testowe odpalenie konsoli","Test INFO");
		obj.warning("to jest testowe odpalenie konsoli","Test WARNING");
		obj.error("to jest testowe odpalenie konsoli","Test ERROR");
		obj.info("to jest testowe odpalenie konsoli","Test INFO");
		obj.warning("to jest testowe odpalenie konsoli","Test WARNING");
		obj.error("to jest testowe odpalenie konsoli","Test ERROR");
		obj.info("to jest testowe odpalenie konsoli","Test INFO");
		obj.warning("to jest testowe odpalenie konsoli","Test WARNING");
		obj.error("to jest testowe odpalenie konsoli","Test ERROR");
		obj.info("to jest testowe odpalenie konsoli","Test INFO");
		obj.warning("to jest testowe odpalenie konsoli","Test WARNING");
		obj.error("to jest testowe odpalenie konsoli","Test ERROR");
		obj.info("to jest testowe odpalenie konsoli","Test INFO");
		obj.warning("to jest testowe odpalenie konsoli","Test WARNING");
		obj.error("to jest testowe odpalenie konsoli","Test ERROR");
		return obj;
	}