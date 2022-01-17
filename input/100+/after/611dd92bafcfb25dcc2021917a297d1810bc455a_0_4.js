f		/* LOGGER v0.666
		* REQUIRED PARAMS: 
		* - paper (on which we will draw button opening the console)
		*/
		var h = paper.height,
			dId = "#console_" + pf,
			button = paper.set(),
			bPath = 'M'+ (paper.width - 170) + ' 0 Q' + (paper.width - 170) + ' 25 '
			 + (paper.width - 145) +' 25 L' + (paper.width - 45) + ' 25 Q' 
			 + (paper.width - 20) + ' 25 ' + (paper.width - 20) + ' 0 Z',
			//buttonBG = paper.rect(paper.width - 170, -25, 150, 50, 25).attr({
			buttonBG = paper.path(bPath).attr({
				fill : "#222",
				"fill-opacity": .75
			});
		button.push(buttonBG);
		//images
		var iImg = paper.image('images/info.png', paper.width - 152, 4, 15, 15),
			wImg = paper.image('images/warning.png', paper.width - 112, 4, 15, 15),
			eImg = paper.image('images/error.png', paper.width - 72, 4, 15, 15);
		button.push(iImg);
		button.push(wImg);
		button.push(eImg);
		//counters
		var iCounter = paper.text(paper.width - 125, 11, "0").attr({fill: "white"}),
			wCounter = paper.text(paper.width - 85, 11, "0").attr({fill: "yellow"}),
			eCounter = paper.text(paper.width - 45, 11, "0").attr({fill: "orange"});
		button.push(iCounter);
		button.push(wCounter);
		button.push(eCounter);
		var buttonMask = paper.path(bPath).attr({
			fill : "#222",
			"fill-opacity": 0.0
		});
		//console object
		var obj = {
			lId : dId,
			counter : [0, 0, 0],
			mask : buttonMask,
			button : button,
			bImgs : [iImg, wImg, eImg],
			bCount : [iCounter, wCounter, eCounter],
			buttonBG : buttonBG,
			bGlow : null,
			animation : null,
			curElCount : 0,
			actionTaken : false,
			info : function(text, title){
				text = text || "(an empty string)";
				if(title) text = "<b>"+title+"</b><br/>" + text;
				this.counter[0]++;
				this.bCount[0].remove();
				this.bCount[0] = paper.text(paper.width - 125, 11, this.counter[0]).attr({fill: "white"});
				this.button.push(this.bCount[0]);
				this.mask.toFront();
				//here adding to div and dTabs
				this.addMessage(text, 0);
			},
			warning : function(text, title){
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
			},
			error : function(text, title){
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
			},
			addMessage : function(message, priority){
				this.curElCount++;
				var divId = "console_row_" + this.curElCount;
				var colors = ['#FAFAFF','#FFFFE0','#FFFAFA'];
				var txtColors = ['white','yellow','orange'];
				var imgNames = ['info','warning','error'];
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
				divString.push(this.curElCount);
				divString.push("'><img src='images/cancel.png' style='padding-left: 2px; padding-top: 3px;'/></div></td></tr></table>");
				divString = divString.join("");
				$(divString).prependTo($(this.lId));
				var that = this;
				var nr = this.curElCount;
				var delId = "#cCancel_"+this.curElCount;
				$(delId).click((function(that){
					return function(){
						that.actionTaken = true;
						that.counter[priority]--;
						that.bCount[priority].remove();
						that.bCount[priority] = paper.text(paper.width - (125 - (priority * 40)), 11, that.counter[priority]).attr({fill: txtColors[priority]});
						that.button.push(that.bCount[priority]);
						that.mask.toFront();
						delId = "#console_row_" + nr;
						$(delId).remove();
					}
				})(this));
			}
		};
		//event handling
		$(dId).click(function(){
			if(obj.actionTaken){
				obj.actionTaken = false;
			}else{
				$(dId).animate({
					height: 0
				});
			}
		});
		obj.mask.click(function(){
			$(dId).animate({
				height: h
			});
		});
		obj.mask.mouseover(function(){
			if(obj.bGlow) obj.bGlow.remove();
			if(obj.animation) clearInterval(obj.animation);
			obj.buttonBG.animate({"fill-opacity": 0.75}, 500);
			obj.bGlow = obj.buttonBG.glow();
		});
		obj.mask.mouseout(function(){
			obj.bGlow.remove();
		});
		return obj;
	}
