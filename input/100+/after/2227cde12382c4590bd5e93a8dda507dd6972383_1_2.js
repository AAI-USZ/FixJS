function() {
	
		var f = window[F_NAME],
			holdId,
			flag = true,
			temporary = [],
			textareaValue = "";
		
		var currentWindow = f.getWindow(),
			currentDocument = currentWindow.document;
		
		var setting = {
			viewCover: false,
			zIndex: 999,
			width: "64%",
			height: "300px",
			align: ["left", "right", "middle"][2]
		},
		style = {
			borderTop: "1px solid #cccccc",
			top: "0px",
			width: "64%",
			margin: "auto",
			padding: "3px",
			color: "white",
			backgroundColor: "black"
		};
		// store child object;
		var childObject = [];			
		
		function discover(o) {
			var node = f.createElement({style:{margin: "10px"}});
			f(o).notExists() &&  (o = 'null');
			if (f(o).isString() || f(o).isNumber()) {
				node.setHTML(o);
			} else {
				var v = o && o.toString ? o.toString() : o, innerHTML = "";
				f(o).isArray() && (v = "[]");
				f(o).isObject() && (v = "{}");
				node.setHTML(
					f()("<div style='clear:left; line-height: 18px;'>")
					 ("<div style='color: #9b1a00; overflow: hidden; width: 246px; float: left;'>")
						("<span style='padding-left: 18px;'>source</span>")
					 ("</div>")
					 ("<div style='padding-left: 246px;'><xmp> ")(v)("\n</xmp></div>")
					 ("</div>")()
				);
				try {
					for (var p in o) {
						try {
							v = o[p] != null ? o[p] : '""';
						} catch(e) {
							v = "Can't access !!!";
						}
						if (f(v).isObject()) {
							childObject.push(v);
							innerHTML = f()("<div style='width: 246px; overflow: hidden; float: left;'>")
												("<span style='margin-right: 6px;'>[+]</span>")
												("<span style='color: #9b1a00; cursor: pointer;' onclick='")(F_NAME)('.callFunction("viewChild")(this, ')(childObject.length - 1)(")'> ")(p)("</span>")
											("</div>")
											("<div style='margin-left: 246px;'><xmp>Object {...}</xmp></div>")
											("<div style='margin-left: 49px; display: none;'></div>")();
						} else {
							v = v.toString ? v.toString() : v;
							innerHTML = f()("<div style='width: 246px; overflow: hidden; float: left;'>")
												("<span style='margin: 0px 12px 0px 8px;'>-</span>")
												("<span style='color: #9b1a00'> ")(p)("</span>")
											("</div>")
											("<div style='margin-left: 246px;'><xmp> ")(v)("\n</xmp></div>")();
						}
						
						node.addChild(
							f.createElement({
								style: "clear:left; line-height: 18px;",
								innerHTML: innerHTML
							})
						);
					}
				} catch(e) {
					node.setHTML("Can't access !!!");
				}
			}
			return node;
		};
		
		var viewChild = f.storeFunction(
			function (clickElement, childId) {
				var parent = clickElement.parentNode.parentNode,
					target = f(parent).getLastChild();
				if (target.getFirstChild().isExists()) {
					target.toggle();
				} else {
					target.addChild(discover(childObject[childId])).show();
				}
			},
			"viewChild"
		);
			
		function removeConsole() {
			if (holdId) {
				var console = currentDocument.getElementById(holdId);
				currentDocument.body.removeChild(console);
				holdId = null;
				childObject = [];
				textareaValue = null;
			}
		}
				
		var common = {
		
			viewSource: function(config) {
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
			},
			log: function(config) {
				var source = this(true) || this(),
					light = "white";
				if (!flag) {
					flag = true;
					light = "black";
				} else {
					flag = false;
				}
				if (f(source).isString() || f(source).isNumber()) {
					temporary.push(
						f()("<div style='width: 100%; color: ")(light)("'><span style='margin: 0px 12px 0px 8px;'>-</span>")
							(source)("</div>")()
					);
				} else {
					temporary.push(
						f()("<div style='width: 100%; color: ")(light)("'>")
							(discover(source).innerHTML)
							("</div>")()
					);
				}
				f(temporary.join("")).viewSource(config);
				return this;
			},
			clear: function() {
				flag = true;
				temporary = [];
				f("").viewSource();
				return this;
			},
			viewStream: function(config) {
				var storeFunction = [],
					callee = arguments.callee.caller;
				while (callee) {
					storeFunction.unshift(callee.toString());
					callee = callee.arguments.callee.caller;
				}
				f(storeFunction).viewSource(config);
				return this;
			}
		}
		f(common).addTo("common");
	}