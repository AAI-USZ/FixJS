function () {
			var $doc, $body;

			$textEditor	= $('<textarea></textarea>').hide();
			$wysiwygEditor	= $('<iframe frameborder="0"></iframe>');

			if(window.location.protocol === "https:")
				$wysiwygEditor.attr("src", "javascript:false");

			// add the editor to the HTML and store the editors element
			$editorContainer.append($wysiwygEditor).append($textEditor);
			wysiwygEditor	= $wysiwygEditor[0];
			textEditor	= $textEditor[0];

			base.width(base.options.width ? base.options.width : $textarea.width());
			base.height(base.options.height ? base.options.height : $textarea.height());
			
			getWysiwygDoc().open();
			getWysiwygDoc().write(
				'<html><head><!--[if gte IE 9]><style>* {min-height: auto !important}</style><![endif]-->' +
				'<meta http-equiv="Content-Type" content="text/html;charset=' + base.options.charset + '" />' +
				'<link rel="stylesheet" type="text/css" href="' + base.options.style + '" />' +
				'</head><body contenteditable="true"><span></span></body></html>'
			);
			getWysiwygDoc().close();
			
			base.readOnly(!!base.options.readOnly);

			$doc	= $(getWysiwygDoc());
			$body	= $doc.find("body");
			
			// set the key press event
			$body.keypress(handleKeyPress);
			$doc.keypress(handleKeyPress)
				.mousedown(handleMouseDown)
				.bind("beforedeactivate keyup", saveRange)
				.focus(function() {
					lastRange = null;
				});
			
			if(base.options.rtl)
			{
				$body.attr('dir', 'rtl');
				$textEditor.attr('dir', 'rtl');
			}
			
			if(base.options.enablePasteFiltering)
				$body.bind("paste", handlePasteEvt);

			rangeHelper = new $.sceditor.rangeHelper(wysiwygEditor.contentWindow);
		}