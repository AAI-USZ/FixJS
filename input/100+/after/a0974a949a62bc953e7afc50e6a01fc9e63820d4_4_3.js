function() {
			$(window).resize(Gibber.Environment.editorResize);
			$("#mega-menu-1").dcMegaMenu({
				speed : 'fast',
			});
			this.createFileList();
			CodeMirror.modeURL = "js/codemirror/mode/%N/%N.js";
			window.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
	  		  lineNumbers: false,
	  		  autofocus: true,
			  indentUnit : 2,
	  		  smartIndent: true,
			});
			CodeMirror.autoLoadMode(window.editor, "javascript");	
			window.CodeMirror = CodeMirror;	
		    window.editor.setOption("mode", "javascript");
			window.editor.setOption("theme", "thecharlie");
		
			CodeMirror.defineMode("links", function(config, parserConfig) { 
			    var linksOverlay = { 
				    token: function(stream, state) { 
					    if (stream.match(/^\b(next\ tutorial:([^\s]+))\b/)) {
					        return "link"; 
						}
					    stream.skipToEnd(); 
				    }
				};
				return CodeMirror.overlayParser(CodeMirror.getMode(config, parserConfig.backdrop || "javascript"), linksOverlay);				
			});
		
		    $('.CodeMirror').delegate(".cm-link", "click", function(e) {
		    	var url = $(event.target).text();
				console.log(url);
	        	Gibber.Environment.loadTutorial(url.split(":")[1]);
		    });
	       
			CodeMirror.autoLoadMode(window.editor, "links");
		    window.editor.setOption("mode", "links");
		
		
			this.loadAndSet("default");
			this.editorResize();
			$.extend($.modal.defaults, {
				onOpen: function (dialog) {
					dialog.overlay.fadeIn('fast', function () {
						//dialog.data.hide();
						dialog.container.fadeIn('fast', function () {
							dialog.data.slideDown('fast');
						});
					});
				},
				onClose: function (dialog) {
					dialog.data.fadeOut('slow', function () {
						dialog.container.hide('slow', function () {
							dialog.overlay.slideUp('slow', function () {
								$.modal.close();
							});
						});
					});
				},
				overlayClose: true,
				position: ["40px", null],
				containerCss: {
					fontFamily: "sans-serif",
					color:"#fff",
					backgroundColor: "rgba(0,0,0,.75)",
					listStyle: "none",
					border: "1px solid #ccc",
					padding: "10px",
				} 
			});
		
			$("#keyCommandMenuItem").bind("click", function() {
				$("#keyCommands").modal();
			});
		
			$("#tutorialMenuItem").bind("click", function() {
				Gibber.Environment.loadTutorial("intro");
			});
		
			$("#quickstartMenuItem").bind("click", function() {
				$("#quickstart").modal({
					minHeight: "325px",
					maxWidth: "500px",
				});
			});
			$("#aboutMenuItem").bind("click", function() {
				$("#about").modal({
					minHeight: "425px",
					maxWidth: "500px",
				});
			});

			var flash = function(cm, pos) {
				if(pos !== null) {
					v = cm.getLine(pos.line);
					
					cm.setLineClass(pos.line, null, "highlightLine")
					
					var cb = (function() { 
						cm.setLineClass(pos.line, null, null);
					});
					
					window.setTimeout(cb, 250);
					
				}else{
					var sel = cm.markText(cm.getCursor(true), cm.getCursor(false), "highlightLine");
					
					var cb = (function() { 
						sel.clear();
					});
					
					window.setTimeout(cb, 250);
				}
			};
			CodeMirror.keyMap.gibber = {
				fallthrough : "default",
				"Ctrl-Enter" : function(cm) { 
					var v = cm.getSelection();
					var pos = null;
					if(v === "") {
						pos = cm.getCursor();
						v = cm.getLine(pos.line);
					}
					flash(cm, pos);			
					Gibber.runScript(v);		
				},
				"Cmd-S":function(cm) {
					//console.log("BLANLSH");
				},
				"Shift-Ctrl-Enter" : function(cm) { 
					var v = cm.getSelection();
					var pos = null;
					if(v === "") {
						pos = cm.getCursor();
						v = cm.getLine(pos.line);
					}
					flash(cm, pos);			
					Gibber.callback.addCallback(v, _1);		
				},
				"Ctrl-`" : function(cm) {
					Gibber.clear();
					Gibber.audioInit = false;
				},
				"Ctrl-I" : function(cm) {
					$('#info').toggle();
					if($("#info").css("display") == "none") {
						$('#code').css("width", "100%");
						$('#console').css("width", "100%");					
					}else{
						$('#code').css("width", "80%");
					}
					cm.refresh();
				},
				"Ctrl-Alt-2" : function(cm) {
					var v = cm.getSelection();
					var pos = null;
					if(v === "") {
						pos = cm.getCursor();
						v = cm.getLine(pos.line);
					}
				
					Gibber.Environment.slaveSocket.send(v);
				},
			};
		
			window.editor.setOption("keyMap", "gibber");
		}