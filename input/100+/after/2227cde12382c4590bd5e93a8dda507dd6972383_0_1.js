function(config) {
				f(config).copyTo(setting);
				(setting.align == "left") && f({position: "absolute", left: "0px"}).copyTo(style);
				(setting.align == "right") && f({position: "absolute", right: "0px"}).copyTo(style);
				(setting.align == "middle") && f({position: "relative"}).copyTo(style);
				f({zIndex: setting.zIndex, width: setting.width}).copyTo(style);
				
				var src = (setting.viewCover == true) ?
							this : (this.list && this.list.length) ? this.list : this.source;
				/* Only show one console,
					if want to show more obeject,
						add them in to an array
							then view this array source.
				*/
				var consoleId = holdId || f.createId();
				if (f(holdId).notExists()) {
					holdId = consoleId;
					var container = f.createElement({
						id: consoleId,
						event: {
							"mousedown": function(event) {
								var evt = event || currentWindow.event;
								evt.cancelBubble = true;
							}
						},
						style: {cursor: "default", top: "0px", position: "absolute", fontFamily: "Courier New", left: "0px", width: "100%", fontSize: "12px", height: "0px", zIndex: 999}
					}).appendTo(currentDocument.body);
				} else {
					// Remove content;
					var container = currentDocument.getElementById(consoleId);
					while (container.firstChild) {
						container.removeChild(container.firstChild);
					}
					container = f(container);
				}
				
				var info = f.createElement({style: style});
				
				var title = f.createElement({
					innerHTML: f()("<div style='float:left;'>")
									("<span>[ + ]</span>")
								("<span style='cursor: pointer;' onclick='" + F_NAME + "(window).viewSource(true);'> window </span>")
								("<span style='cursor: pointer;' onclick='" + F_NAME + "(document).viewSource(true);'> / document </span>")
								("</div>")(),
					style: {padding: "3px 0px 0px 0px", height: "20px"}
				});
				
				var button = f.createElement({
					style: {textAlign: "right", margin: "0px 0px 0px 200px", cursor: "move"}
				});
				
				var minimize = f.createElement({
					innerHTML: "--",
					tagName: "span",
					style: {color: "red", fontWeight: "bold", cursor: "pointer", marginRight: "12px"},
					event: {
						mousedown: function(event) {
							var evt = event || currentWindow.event;
							evt.cancelBubble = true;
							resizeConsole();
						}
					}
				});
				
				var close = f.createElement({
					innerHTML: "[X]",
					tagName: "span",
					style: {color: "red", fontWeight: "bold", cursor: "pointer"},
					event: {
						mousedown: function(event) {
							var evt = event || currentWindow.event;
							evt.cancelBubble = true;
							removeConsole();
						}
					}
				});
				
				var dynamic = f.createElement({
					style: {position: "relative", width: "100%"}
				});
				
				var textarea = f.createElement({
					innerHTML: textareaValue,
					tagName: "textarea",
					style: {height: "43px", width: "100%", overflow: "auto", marginLeft: "-3px"}
				});
				
				var active = f.createElement({
					innerHTML: "eval",
					tagName: "span",
					event: {
						mousedown: function(event) {
							var evt = event || currentWindow.event;
							evt.cancelBubble = true;
							textareaValue = textarea.getHTML();
							textareaValue && eval(textareaValue);
						}
					},
					style: {position: "absolute", cursor: "pointer", bottom: "-23px", right: "-3px",  padding: "2px 10px", background: "white", color: "black", border: "2px solid green"}
				});
				
				var content = f.createElement({
					style: {background: "#848484", borderTop: "2px solid black", height: setting.height, width: "100%", overflow: "auto"},
					event: {
						"mousedown": function(event) {
							var evt = event || currentWindow.event;
							evt.cancelBubble = true;
						}
					}
				});
				
				container.addChild(
					info.addChild(
						title.addChild(button.addChild(minimize, close)),
						dynamic.addChild(textarea, active),
						content
					)
				);
									
				function resizeConsole() {
					if (content.getStyle('display') != "none") {
						content.hide();
						minimize.setHTML("[]");
					} else {
						content.show();
						minimize.setHTML("--");
					}
				}
				
				title.setDragable({proxy: container.source});
				content.addChild(discover(src));
				return this;
			}