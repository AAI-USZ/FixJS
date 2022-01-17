function (transition, flagInOut) {
	var duration = transition.dur ? parseInt(transition.dur.split("s")[0])*1000 : 1000;
	var cssBegin={}, cssEnd={}, target="";
	switch (transition.type) {
		case "fade": {
			// fade
			transition.subtype = transition.subtype || "crossfade";
			target = this.htmlPlayer;
			cssBegin.opacity = transition.startProgress || 0;
			cssEnd.opacity = transition.endProgress || 1;
			if (transition.subtype=="fadeToColor" || transition.subtype=="fadeFromColor") {
				$(this.htmlPlayerBkg).css("background-color",transition.fadeColor||"black");
				if (transition.subtype=="fadeToColor") {
					flagInOut = "out";
				} else {
					flagInOut = "in";
				}
			}
			if (flagInOut=="out") {
				var aux = cssBegin.opacity;
				cssBegin.opacity = cssEnd.opacity;
				cssEnd.opacity = aux;
			}
			this.opacity = cssEnd.opacity;
			break;
		}
		case "barWipe": {
			// barWipe
			transition.subtype = transition.subtype || "leftToRight";
			target = this.htmlPlayerBkg;
			var reverse = (transition.direction=="reverse"?1:0) + (flagInOut=="out"?1:0) == 1;
			switch (transition.subtype) {
				case "leftToRight": {
					cssBegin.width = "0px";
					cssEnd.width = $(this.htmlPlayer).css("width");
					if (reverse) {
						cssBegin.left = (parseInt($(this.htmlPlayer).css("left").split("px")[0]) + parseInt($(this.htmlPlayer).css("width").split("px")[0])) + "px";
						cssEnd.left = $(this.htmlPlayer).css("left");
					}
					break;
				}
				case "topToBottom": {
					cssBegin.height = "0px";
					cssEnd.height = $(this.htmlPlayer).css("height");
					if (reverse) {
						cssBegin.top = (parseInt($(this.htmlPlayer).css("top").split("px")[0]) + parseInt($(this.htmlPlayer).css("height").split("px")[0])) + "px";
						cssEnd.top = $(this.htmlPlayer).css("top");
					}
					break;
				}
			}
			if (flagInOut=="out") {
				var aux;
				for (i in cssBegin) {
					aux = cssBegin[i];
					cssBegin[i] = cssEnd[i];
					cssEnd[i] = aux;
				}
			}
			break;
		}
		case "irisWipe": {
			// irisWipe
			transition.subtype = transition.subtype || "rectangle";
			target = this.htmlPlayerBkg;
			if (transition.subtype == "rectangle") {
				var left = parseInt($(this.htmlPlayer).css("left").split("px")[0]);
				var top = parseInt($(this.htmlPlayer).css("top").split("px")[0]);
				var width = parseInt($(this.htmlPlayer).css("width").split("px")[0]);
				var height = parseInt($(this.htmlPlayer).css("height").split("px")[0]);
				cssBegin.width = "0px";
				cssBegin.height = "0px";
				cssBegin.left = (left+(width/2)) + "px";
				cssBegin.top = (top+(height/2)) + "px";
				cssEnd.width = width + "px";
				cssEnd.height = height + "px";
				cssEnd.left = left + "px";
				cssEnd.top = top + "px";
				if (flagInOut=="out") {
					var aux;
					for (i in cssBegin) {
						aux = cssBegin[i];
						cssBegin[i] = cssEnd[i];
						cssEnd[i] = aux;
					}
				}
			} else {
				// diamond
				// TODO
				Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"transition",[transition.type,transition.subtype]);
			}
			break;
		}
		case "snakeWipe":
		case "clockWipe": {
			// snakeWipe, clockWipe
			// TODO
			Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"transition",[transition.type]);
			break;
		}
	}
	$(target).css(cssBegin);
	$(target).animate(cssEnd,duration);
	$(target).dequeue();
}