function initLogger(paper){
		/* user console
		* REQUIRED PARAMS: 
		* - paper (on which we will draw button opening the console)
		*/
		var h = paper.height,
			dId = "#console_" + pf,
			button = paper.set(),
			buttonBG = paper.rect(paper.width - 170, -25, 150, 50, 25).attr({
				fill : "#222",
				"fill-opacity": .75
			});
		button.push(buttonBG);
		//images
		var bImages = paper.set(),
			iImg = paper.image('images/info.png', paper.width - 152, 3, 15, 15),
			wImg = paper.image('images/warning.png', paper.width - 112, 3, 15, 15),
			eImg = paper.image('images/error.png', paper.width - 72, 3, 15, 15);
		bImages.push(iImg);
		bImages.push(wImg);
		bImages.push(eImg);
		button.push(bImages);
		//counters
		var bCounters = paper.set(),
			iCounter = paper.text(paper.width - 125, 11, "0").attr({fill: "white"}),
			wCounter = paper.text(paper.width - 85, 11, "0").attr({fill: "yellow"}),
			eCounter = paper.text(paper.width - 45, 11, "0").attr({fill: "orange"});
		bCounters.push(iCounter);
		bCounters.push(wCounter);
		bCounters.push(eCounter);
		button.push(bCounters);
		//console object
		var obj = {
			lId : dId,
			button : button,
			bImgs : [iImg, wImg, eImg],
			bCount : [iCounter, wCounter, eCounter],
			buttonBG : buttonBG,
			bGlow : null,
			counter : [0, 0, 0],
			animation : null,
			info : function(i){
				this.counter[0]++;
				this.bCount[0].remove();
				this.bCount[0] = paper.text(paper.width - 125, 11, this.counter[0]).attr({fill: "white"});
				this.button.push(this.bCount[0]);
				//here adding to div
			},
			warning : function(w){
				this.counter[1]++;
				this.bCount[1].remove();
				this.bCount[1] = paper.text(paper.width - 85, 11, this.counter[1]).attr({fill: "yellow"});
				this.button.push(this.bCount[1]);
				if(this.bGlow) this.bGlow.remove();
				this.bGlow = this.buttonBG.glow().attr({fill : "#FFFF00"});
				//here adding to div
			},
			error : function(e){
				this.counter[2]++;
				this.bCount[2].remove();
				this.bCount[2] = paper.text(paper.width - 45, 11, this.counter[2]).attr({fill: "orange"})
				this.button.push(this.bCount[2]);
				if(this.bGlow) this.bGlow.remove();
				this.bGlow = this.buttonBG.glow(10, true).attr({fill : "#FF2900"});
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
		};
		//event handling
		$(dId).click(function(){
			$(dId).animate({
				height: 0,
				overflow : 'hidden'
			});
		});
		obj.button.click(function(){
			$(dId).animate({
				height: h,
				overflow : 'scroll'
			});
		});
		obj.button.mouseover(function(){
			if(obj.bGlow) obj.bGlow.remove();
			if(obj.animation) clearInterval(obj.animation);
			obj.buttonBG.animate({"fill-opacity": 0.75}, 500);
			obj.bGlow = obj.buttonBG.glow();
		});
		obj.button.mouseout(function(){
			obj.bGlow.remove();
		});
		return obj;
	}