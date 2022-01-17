function(){
			var buttonBar = document.getElementById("wmd-button-bar");
			var normalYShift = "0px";
			var disabledYShift = "-20px";
			var highlightYShift = "-40px";
			
			var buttonRow = document.createElement("ul");
			buttonRow.id = "wmd-button-row";
			buttonRow = buttonBar.appendChild(buttonRow);

			
			var boldButton = document.createElement("li");
			boldButton.className = "wmd-button";
			boldButton.id = "wmd-bold-button";
			boldButton.title = toolbar_strong_label;
			boldButton.XShift = "0px";
			boldButton.textOp = command.doBold;
			setupButton(boldButton, true);
			buttonRow.appendChild(boldButton);
			
			var italicButton = document.createElement("li");
			italicButton.className = "wmd-button";
			italicButton.id = "wmd-italic-button";
			italicButton.title = toolbar_emphasis_label;
			italicButton.XShift = "-20px";
			italicButton.textOp = command.doItalic;
			setupButton(italicButton, true);
			buttonRow.appendChild(italicButton);

			var spacer1 = document.createElement("li");
			spacer1.className = "wmd-spacer";
			spacer1.id = "wmd-spacer1";
			buttonRow.appendChild(spacer1); 

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

			var quoteButton = document.createElement("li");
			quoteButton.className = "wmd-button";
			quoteButton.id = "wmd-quote-button";
			quoteButton.title = toolbar_blockquote_label;
			quoteButton.XShift = "-60px";
			quoteButton.textOp = command.doBlockquote;
			setupButton(quoteButton, true);
			buttonRow.appendChild(quoteButton);
			
			var codeButton = document.createElement("li");
			codeButton.className = "wmd-button";
			codeButton.id = "wmd-code-button";
			codeButton.title = toolbar_code_label;
			codeButton.XShift = "-80px";
			codeButton.textOp = command.doCode;
			setupButton(codeButton, true);
			buttonRow.appendChild(codeButton);

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

			var spacer2 = document.createElement("li");
			spacer2.className = "wmd-spacer";
			spacer2.id = "wmd-spacer2";
			buttonRow.appendChild(spacer2); 

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
			
			var headingButton = document.createElement("li");
			headingButton.className = "wmd-button";
			headingButton.id = "wmd-heading-button";
			headingButton.title = toolbar_heading_label;
			headingButton.XShift = "-180px";
			headingButton.textOp = command.doHeading;
			setupButton(headingButton, true);
			buttonRow.appendChild(headingButton); 
			
			var hrButton = document.createElement("li");
			hrButton.className = "wmd-button";
			hrButton.id = "wmd-hr-button";
			hrButton.title = toolbar_horizontal_label;
			hrButton.XShift = "-200px";
			hrButton.textOp = command.doHorizontalRule;
			setupButton(hrButton, true);
			buttonRow.appendChild(hrButton); 
			
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
			setUndoRedoButtonStates();
		}