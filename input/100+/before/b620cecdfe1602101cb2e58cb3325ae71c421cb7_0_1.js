function () {
			var $doc, $body;

			$textEditor	= $('<textarea></textarea>').hide();
			$wysiwygEditor	= $('<iframe frameborder="0"></iframe>');
			$wrapper	= $('<div class="wrapper" />');

			if(window.location.protocol === "https:")
				$wysiwygEditor.attr("src", "javascript:false");
			
			if(/iPhone|iPod|iPad| wosbrowser\//i.test(navigator.userAgent))
				$wrapper.addClass('ios-fix');

			// add the editor to the HTML and store the editors element
			$wrapper.append($wysiwygEditor).append($textEditor);
			$editorContainer.append($wrapper);
			wysiwygEditor	= $wysiwygEditor[0];
			textEditor	= $textEditor[0];

			base.width(base.options.width || $textarea.width());
			base.height(base.options.height || $textarea.height());

			getWysiwygDoc().open();
			getWysiwygDoc().write(_tmpl("html", {
				charset: base.options.charset,
				style: base.options.style
			}));
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

			if(base.options.autoExpand)
				$doc.bind("keyup", base.expandToContent);

			rangeHelper = new $.sceditor.rangeHelper(wysiwygEditor.contentWindow);
		}