function(previewRefreshCallback){
	
		if (!previewRefreshCallback) {
			previewRefreshCallback = function(){};
		}
		
		var inputBox = wmd.panels.input;
		
		var offsetHeight = 0;
		
		var editObj = this;
		
		var mainDiv;
		var mainSpan;
		
		var div; // This name is pretty ambiguous.  I should rename this.
		
		// Used to cancel recurring events from setInterval.
		var creationHandle;
		
		var undoMgr; // The undo manager

        var isButtonUsed = function(button){
            var buttons = $.trim(wmd.wmd_env.buttons).split(/\s+/);
            return $.inArray(button, buttons) !== -1;
        };
		
		// Perform the button's action.
		var doClick = function(button){
		
			inputBox.focus();
			
			if (button.textOp) {
				
				if (undoMgr) {
					undoMgr.setCommandMode();
				}
				
				var state = new wmd.TextareaState();
				
				if (!state) {
					return;
				}
				
				var chunks = state.getChunks();
				
				// Some commands launch a "modal" prompt dialog.  Javascript
				// can't really make a modal dialog box and the WMD code
				// will continue to execute while the dialog is displayed.
				// This prevents the dialog pattern I'm used to and means
				// I can't do something like this:
				//
				// var link = CreateLinkDialog();
				// makeMarkdownLink(link);
				// 
				// Instead of this straightforward method of handling a
				// dialog I have to pass any code which would execute
				// after the dialog is dismissed (e.g. link creation)
				// in a function parameter.
				//
				// Yes this is awkward and I think it sucks, but there's
				// no real workaround.  Only the image and link code
				// create dialogs and require the function pointers.
				var fixupInputArea = function(){
				
					inputBox.focus();
					
					if (chunks) {
						state.setChunks(chunks);
					}
					
					state.restore();
					previewRefreshCallback();
				};
				
				var noCleanup = button.textOp(chunks, fixupInputArea);
				
				if(!noCleanup) {
					fixupInputArea();
				}
				
			}
			
			if (button.execute) {
				button.execute(editObj);
			}
		};
			
		var setUndoRedoButtonStates = function(){
			if(undoMgr){
				setupButton(document.getElementById("wmd-undo-button"), undoMgr.canUndo());
				setupButton(document.getElementById("wmd-redo-button"), undoMgr.canRedo());
			}
		};
		
		var setupButton = function(button, isEnabled) {
		
			var normalYShift = "0px";
			var disabledYShift = "-20px";
			var highlightYShift = "-40px";
			
			if(isEnabled) {
				button.style.backgroundPosition = button.XShift + " " + normalYShift;
				button.onmouseover = function(){
					this.style.backgroundPosition = this.XShift + " " + highlightYShift;
				};
							
				button.onmouseout = function(){
					this.style.backgroundPosition = this.XShift + " " + normalYShift;
				};
				
				// IE tries to select the background image "button" text (it's
				// implemented in a list item) so we have to cache the selection
				// on mousedown.
				if(global.isIE) {
					button.onmousedown =  function() { 
						wmd.ieRetardedClick = true;
						wmd.ieCachedRange = document.selection.createRange(); 
					};
				}
				
				if (!button.isHelp)
				{
					button.onclick = function() {
						if (this.onmouseout) {
							this.onmouseout();
						}
						doClick(this);
						return false;
					};
				}
			}
			else {
				button.style.backgroundPosition = button.XShift + " " + disabledYShift;
				button.onmouseover = button.onmouseout = button.onclick = function(){};
			}
		};

		var makeSpritedButtonRow = function(){
			var buttonBar = document.getElementById("wmd-button-bar");
			var normalYShift = "0px";
			var disabledYShift = "-20px";
			var highlightYShift = "-40px";
			
			var buttonRow = document.createElement("ul");
			buttonRow.id = "wmd-button-row";
			buttonRow = buttonBar.appendChild(buttonRow);

            if (isButtonUsed('bold')){
                var boldButton = document.createElement("li");
                boldButton.className = "wmd-button";
                boldButton.id = "wmd-bold-button";
                boldButton.title = toolbar_strong_label;
                boldButton.XShift = "0px";
                boldButton.textOp = command.doBold;
                setupButton(boldButton, true);
                buttonRow.appendChild(boldButton);
            }
			
            if (isButtonUsed('italic')){
                var italicButton = document.createElement("li");
                italicButton.className = "wmd-button";
                italicButton.id = "wmd-italic-button";
                italicButton.title = toolbar_emphasis_label;
                italicButton.XShift = "-20px";
                italicButton.textOp = command.doItalic;
                setupButton(italicButton, true);
                buttonRow.appendChild(italicButton);
            }

            if (
                isButtonUsed('link') ||
                isButtonUsed('blockquote') ||
                isButtonUsed('code') ||
                isButtonUsed('image') ||
                isButtonUsed('attachment')
            ) {
                var spacer1 = document.createElement("li");
                spacer1.className = "wmd-spacer";
                spacer1.id = "wmd-spacer1";
                buttonRow.appendChild(spacer1); 
            }

            if (isButtonUsed('link')){
                var linkButton = document.createElement("li");
                linkButton.className = "wmd-button";
                linkButton.id = "wmd-link-button";
                linkButton.title = toolbar_hyperlink_label;
                linkButton.XShift = "-40px";
                linkButton.textOp = function(chunk, postProcessing){
                    return command.doLinkOrImage(chunk, postProcessing, 'link');
                };
                setupButton(linkButton, true);
                buttonRow.appendChild(linkButton);
            }

            if (isButtonUsed('blockquote')){
                var quoteButton = document.createElement("li");
                quoteButton.className = "wmd-button";
                quoteButton.id = "wmd-quote-button";
                quoteButton.title = toolbar_blockquote_label;
                quoteButton.XShift = "-60px";
                quoteButton.textOp = command.doBlockquote;
                setupButton(quoteButton, true);
                buttonRow.appendChild(quoteButton);
            }
			
            if (isButtonUsed('code')){
                var codeButton = document.createElement("li");
                codeButton.className = "wmd-button";
                codeButton.id = "wmd-code-button";
                codeButton.title = toolbar_code_label;
                codeButton.XShift = "-80px";
                codeButton.textOp = command.doCode;
                setupButton(codeButton, true);
                buttonRow.appendChild(codeButton);
            }

            if (isButtonUsed('image')){
                var imageButton = document.createElement("li");
                imageButton.className = "wmd-button";
                imageButton.id = "wmd-image-button";
                imageButton.title = toolbar_image_label;
                imageButton.XShift = "-100px";
                imageButton.textOp = function(chunk, postProcessing){
                    return command.doLinkOrImage(chunk, postProcessing, 'image');
                };
                setupButton(imageButton, true);
                buttonRow.appendChild(imageButton);
            }

            if (isButtonUsed('attachment')){
                var attachmentButton = document.createElement("li");
                attachmentButton.className = "wmd-button";
                attachmentButton.id = "wmd-attachment-button";
                attachmentButton.title = toolbar_attachment_label;
                attachmentButton.XShift = "-120px";
                attachmentButton.textOp = function(chunk, postProcessing){
                    return command.doLinkOrImage(chunk, postProcessing, 'file');
                };
                setupButton(attachmentButton, true);
                buttonRow.appendChild(attachmentButton);
            }

            if (
                isButtonUsed('ol') ||
                isButtonUsed('ul') ||
                isButtonUsed('heading') ||
                isButtonUsed('hr')
            ) {
                var spacer2 = document.createElement("li");
                spacer2.className = "wmd-spacer";
                spacer2.id = "wmd-spacer2";
                buttonRow.appendChild(spacer2); 
            }

            if (isButtonUsed('ol')) {
                var olistButton = document.createElement("li");
                olistButton.className = "wmd-button";
                olistButton.id = "wmd-olist-button";
                olistButton.title = toolbar_numbered_label;
                olistButton.XShift = "-140px";
                olistButton.textOp = function(chunk, postProcessing){
                    command.doList(chunk, postProcessing, true);
                };
                setupButton(olistButton, true);
                buttonRow.appendChild(olistButton);
            }
			
            if (isButtonUsed('ul')) {
                var ulistButton = document.createElement("li");
                ulistButton.className = "wmd-button";
                ulistButton.id = "wmd-ulist-button";
                ulistButton.title = toolbar_bulleted_label;
                ulistButton.XShift = "-160px";
                ulistButton.textOp = function(chunk, postProcessing){
                    command.doList(chunk, postProcessing, false);
                };
                setupButton(ulistButton, true);
                buttonRow.appendChild(ulistButton);
            }
			
            if (isButtonUsed('heading')) {
                var headingButton = document.createElement("li");
                headingButton.className = "wmd-button";
                headingButton.id = "wmd-heading-button";
                headingButton.title = toolbar_heading_label;
                headingButton.XShift = "-180px";
                headingButton.textOp = command.doHeading;
                setupButton(headingButton, true);
                buttonRow.appendChild(headingButton); 
            }
			
            if (isButtonUsed('hr')) {
                var hrButton = document.createElement("li");
                hrButton.className = "wmd-button";
                hrButton.id = "wmd-hr-button";
                hrButton.title = toolbar_horizontal_label;
                hrButton.XShift = "-200px";
                hrButton.textOp = command.doHorizontalRule;
                setupButton(hrButton, true);
                buttonRow.appendChild(hrButton); 
            }
			
            if (isButtonUsed('undo')){
                var spacer3 = document.createElement("li");
                spacer3.className = "wmd-spacer";
                spacer3.id = "wmd-spacer3";
                buttonRow.appendChild(spacer3); 
                
                var undoButton = document.createElement("li");
                undoButton.className = "wmd-button";
                undoButton.id = "wmd-undo-button";
                undoButton.title = toolbar_undo_label;
                undoButton.XShift = "-220px";
                undoButton.execute = function(manager){
                    manager.undo();
                };
                setupButton(undoButton, true);
                buttonRow.appendChild(undoButton); 
                
                var redoButton = document.createElement("li");
                redoButton.className = "wmd-button";
                redoButton.id = "wmd-redo-button";
                redoButton.title = toolbar_redo_label;
                if (/win/.test(nav.platform.toLowerCase())) {
                    redoButton.title = toolbar_redo_label;
                }
                else {
                    // mac and other non-Windows platforms
                    redoButton.title = gettext('redo') + " - Ctrl+Shift+Z";
                }
                redoButton.XShift = "-240px";
                redoButton.execute = function(manager){
                    manager.redo();
                };
                setupButton(redoButton, true);
                buttonRow.appendChild(redoButton); 
			    setUndoRedoButtonStates();
            }
			/*
			var helpButton = document.createElement("li");
			helpButton.className = "wmd-button";
			helpButton.id = "wmd-help-button";
			helpButton.XShift = "-240px";
			helpButton.isHelp = true;
			
			var helpAnchor = document.createElement("a");
			helpAnchor.href = helpLink;
			helpAnchor.target = helpTarget
			helpAnchor.title = helpHoverTitle;
			helpButton.appendChild(helpAnchor);
			
			setupButton(helpButton, true);
			buttonRow.appendChild(helpButton);
			*/
		};
		
		var setupEditor = function(){
		
			if (/\?noundo/.test(doc.location.href)) {
				wmd.nativeUndo = true;
			}
			
			if (!wmd.nativeUndo && isButtonUsed('undo')) {
				undoMgr = new wmd.undoManager(function(){
					previewRefreshCallback();
					setUndoRedoButtonStates();
				});
			}
			
			makeSpritedButtonRow();
			
			
			var keyEvent = "keydown";
			if (global.isOpera) {
				keyEvent = "keypress";
			}
			
			util.addEvent(inputBox, keyEvent, function(key){
				
				// Check to see if we have a button key and, if so execute the callback.
				if (key.ctrlKey || key.metaKey) {
				
					var keyCode = key.charCode || key.keyCode;
					var keyCodeStr = String.fromCharCode(keyCode).toLowerCase();
					
					// Bugfix for messed up DEL and .
					if (keyCode === 46) {
						keyCodeStr = "";
					}
					if (keyCode === 190) {
						keyCodeStr = ".";
					}
					
					switch(keyCodeStr) {
						case "b":
							doClick(document.getElementById("wmd-bold-button"));
							break;
						case "i":
							doClick(document.getElementById("wmd-italic-button"));
							break;
						case "l":
							doClick(document.getElementById("wmd-link-button"));
							break;
						case ".":
							doClick(document.getElementById("wmd-quote-button"));
							break;
						case "k":
							doClick(document.getElementById("wmd-code-button"));
							break;
						case "g":
							doClick(document.getElementById("wmd-image-button"));
							break;
						case "o":
							doClick(document.getElementById("wmd-olist-button"));
							break;
						case "u":
							doClick(document.getElementById("wmd-ulist-button"));
							break;
						case "h":
							doClick(document.getElementById("wmd-heading-button"));
							break;
						case "r":
							doClick(document.getElementById("wmd-hr-button"));
							break;
						case "y":
							doClick(document.getElementById("wmd-redo-button"));
							break;
						case "z":
							if(key.shiftKey) {
								doClick(document.getElementById("wmd-redo-button"));
							}
							else {
								doClick(document.getElementById("wmd-undo-button"));
							}
							break;
						default:
							return;
					}
					

					if (key.preventDefault) {
						key.preventDefault();
					}
					
					if (top.event) {
						top.event.returnValue = false;
					}
				}
			});
			
			// Auto-indent on shift-enter
			util.addEvent(inputBox, "keyup", function(key){
				if (key.shiftKey && !key.ctrlKey && !key.metaKey) {
					var keyCode = key.charCode || key.keyCode;
					// Character 13 is Enter
					if (keyCode === 13) {
						fakeButton = {};
						fakeButton.textOp = command.doAutoindent;
						doClick(fakeButton);
					}
				}
			});
			
			if (inputBox.form) {
				var submitCallback = inputBox.form.onsubmit;
				inputBox.form.onsubmit = function(){
					convertToHtml();
					if (submitCallback) {
						return submitCallback.apply(this, arguments);
					}
				};
			}
		};
		
		// Convert the contents of the input textarea to HTML in the output/preview panels.
		var convertToHtml = function(){
		
			if (wmd.showdown) {
				var markdownConverter = new wmd.showdown.converter();
			}
			var text = inputBox.value;
			
			var callback = function(){
				inputBox.value = text;
        //value is assigned here
			};
			
			if (!/markdown/.test(wmd.wmd_env.output.toLowerCase())) {
				if (markdownConverter) {
					inputBox.value = markdownConverter.makeHtml(text);
          //value is assigned here
					top.setTimeout(callback, 0);
				}
			}
			return true;
		};
		
		
		this.undo = function(){
			if (undoMgr) {
				undoMgr.undo();
			}
		};
		
		this.redo = function(){
			if (undoMgr) {
				undoMgr.redo();
			}
		};
		
		// This is pretty useless.  The setupEditor function contents
		// should just be copied here.
		var init = function(){
			setupEditor();
		};
		
		this.destroy = function(){
			if (undoMgr) {
				undoMgr.destroy();
			}
			if (div.parentNode) {
				div.parentNode.removeChild(div);
			}
			if (inputBox) {
				inputBox.style.marginTop = "";
			}
			top.clearInterval(creationHandle);
		};
		
		init();
	}