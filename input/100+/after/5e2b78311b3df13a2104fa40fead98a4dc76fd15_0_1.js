function newHandler(e) {
						e = e || window.event;
						var l = document.documentElement, b = document.body;
						var evObj = { 
								keyCode: e.keyCode || e.which, // http://unixpapa.com/js/key.html
								button: e.which || e.button,
								rightClick: e.which ? (e.which == 3) : (e.button == 2)
							};
						
						if (e.clientX || e.clientY) {
							evObj.pageX = l.scrollLeft + b.scrollLeft + e.clientX;
							evObj.pageY = l.scrollTop + b.scrollTop + e.clientY;
						}
						if (e.detail || e.wheelDelta)
							evObj.wheelDir = (e.detail < 0 || e.wheelDelta > 0) ? 1 : -1;
						
						// @cond debug try {
						if (handler.call(e.target, e, evObj) === false) {
							if (e.preventDefault) // W3C DOM2 event cancelling
								e.preventDefault();
							if (e.stopPropagation) // cancel bubble for W3C DOM
								e.stopPropagation();
							e.returnValue = false; // cancel for IE
							e.cancelBubble = true; // cancel bubble for IE
						}
						// @cond debug } catch (ex) { error("Error in event handler \""+name+"\": "+ex); }
					}