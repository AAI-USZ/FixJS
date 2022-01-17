function (el, options) {
		/**
		 * Alias of this
		 * @private
		 */
		var base = this;

		/**
		 * The textarea element being replaced
		 * @private
		 */
		var $textarea = $(el);
		var textarea  = el;

		/**
		 * The div which contains the editor and toolbar
		 * @private
		 */
		var $editorContainer;

		/**
		 * The editors toolbar
		 * @private
		 */
		var $toolbar;

		/**
		 * The editors iframe which should be in design mode
		 * @private
		 */
		var $wysiwygEditor;
		var wysiwygEditor;

		/**
		 * The editors textarea for viewing source
		 * @private
		 */
		var $textEditor;
		var textEditor;

		/**
		 * The current dropdown
		 * @private
		 */
		var $dropdown;
		var dropdownIgnoreLastClick = false;

		/**
		 * Array of all the commands key press functions
		 * @private
		 */
		var keyPressFuncs = [];

		/**
		 * Store the last cursor position. Needed for IE because it forgets
		 * @private
		 */
		var lastRange;

		/**
		 * The editors locale
		 * @private
		 */
		var locale;

		/**
		 * Stores a cache of preloaded images
		 * @private
		 */
		var preLoadCache = [];

		var rangeHelper;
		
		var $blurElm;

		var	init,
			replaceEmoticons,
			handleCommand,
			saveRange,
			handlePasteEvt,
			handlePasteData,
			handleKeyPress,
			handleFormReset,
			handleMouseDown,
			initEditor,
			initToolBar,
			initKeyPressFuncs,
			initResize,
			documentClickHandler,
			formSubmitHandler,
			initEmoticons,
			getWysiwygDoc,
			handleWindowResize,
			initLocale,
			updateToolBar,
			textEditorSelectedText,
			autofocus;

		/**
		 * All the commands supported by the editor
		 */
		base.commands = $.extend({}, (options.commands || $.sceditor.commands));

		/**
		 * Initializer. Creates the editor iframe and textarea
		 * @private
		 * @name sceditor.init
		 */
		init = function () {
			$textarea.data("sceditor", base);
			base.options = $.extend({}, $.sceditor.defaultOptions, options);

			// Load locale
			if(base.options.locale && base.options.locale !== "en")
				initLocale();

			// if either width or height are % based, add the resize handler to update the editor
			// when the window is resized
			var h = base.options.height, w = base.options.width;
			if((h && (h + "").indexOf("%") > -1) || (w && (w + "").indexOf("%") > -1))
				$(window).resize(handleWindowResize);

			$editorContainer = $('<div class="sceditor-container" />').insertAfter($textarea);

			// create the editor
			initToolBar();
			initEditor();
			initKeyPressFuncs();

			if(base.options.resizeEnabled)
				initResize();

			if(base.options.id)
				$editorContainer.attr('id', base.options.id);

			$(document).click(documentClickHandler);
			$(textarea.form)
				.attr('novalidate','novalidate')
				.bind("reset", handleFormReset)
				.submit(formSubmitHandler);

			// load any textarea value into the editor
			base.val($textarea.hide().val());

			if(base.options.autofocus)
				autofocus();

			// force into source mode if is a browser that can't handle
			// full editing
			if(!$.sceditor.isWysiwygSupported())
				base.toggleTextMode();

			if(base.options.toolbar.indexOf('emoticon') !== -1)
				initEmoticons();

			// Can't use load event as it gets fired before CSS is loaded
			// in some browsers
			if(base.options.autoExpand)
				var interval = setInterval(function() {
					if (!document.readyState || document.readyState === "complete") {
						base.expandToContent();
						clearInterval(interval);
					}
				}, 10);
		};

		/**
		 * Creates the editor iframe and textarea
		 * @private
		 */
		initEditor = function () {
			var $doc, $body;

			$textEditor	= $('<textarea></textarea>').hide();
			$wysiwygEditor	= $('<iframe frameborder="0"></iframe>');

			if(window.location.protocol === "https:")
				$wysiwygEditor.attr("src", "javascript:false");

			// add the editor to the HTML and store the editors element
			$editorContainer.append($wysiwygEditor).append($textEditor);
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
			
			// iframe overflow fix
			if(/iPhone|iPod|iPad| wosbrowser\//i.test(navigator.userAgent))
				$body.height('100%');

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
		};

		/**
		 * Creates the toolbar and appends it to the container
		 * @private
		 */
		initToolBar = function () {
			var	group, buttons,
				button, i, buttonClick,
				groups = base.options.toolbar.split("|");

			buttonClick = function (e) {
				e.preventDefault();

				if(!$(this).hasClass('disabled'))
					handleCommand($(this), base.commands[$(this).data("sceditor-command")]);

				return false;
			};

			$toolbar = $('<div class="sceditor-toolbar" />');
			for (i=0; i < groups.length; i++) {
				group   = $('<div class="sceditor-group" />');
				buttons = groups[i].split(",");

				for (var x=0; x < buttons.length; x++) {
					// the button must be a valid command otherwise ignore it
					if(!base.commands[buttons[x]])
						continue;

					button = _tmpl("toolbarButton", {
						name: buttons[x],
						dispName: base.commands[buttons[x]].tooltip || buttons[x]
					}, true).click(buttonClick);

					if(base.commands[buttons[x]].tooltip)
						button.attr('title', base._(base.commands[buttons[x]].tooltip));

					if(base.commands[buttons[x]].exec)
						button.data('sceditor-wysiwygmode', true);
					else
						button.addClass('disabled');

					if(base.commands[buttons[x]].txtExec)
						button.data('sceditor-txtmode', true);

					group.append(button);
				}
				$toolbar.append(group);
			}

			// append the toolbar to the toolbarContainer option if given
			if(base.options.toolbarContainer)
				$(base.options.toolbarContainer).append($toolbar);
			else
				$editorContainer.append($toolbar);
		};

		/**
		 * Autofocus the editor
		 * @private
		 */
		autofocus = function() {
			var	doc	= wysiwygEditor.contentWindow.document,
				body	= doc.body, rng;

			if(!doc.createRange)
				return base.focus();

			if(!body.firstChild)
				return;

			rng = doc.createRange();
			rng.setStart(body.firstChild, 0);
			rng.setEnd(body.firstChild, 0);

			rangeHelper.selectRange(rng);
			body.focus();
		};

		/**
		 * Gets the readOnly property of the editor
		 *
		 * @since 1.3.5
		 * @function
		 * @memberOf jQuery.sceditor.prototype
		 * @name readOnly
		 * @return {boolean}
		 */
		/**
		 * Sets the readOnly property of the editor
		 *
		 * @param {boolean} readOnly
		 * @since 1.3.5
		 * @function
		 * @memberOf jQuery.sceditor.prototype
		 * @name readOnly^2
		 * @return {this}
		 */
		base.readOnly = function(readOnly) {
			if(typeof readOnly !== 'boolean')
				return $textEditor.attr('readonly') === 'readonly';

			getWysiwygDoc().body.contentEditable = !readOnly;

			if(!readOnly)
				$textEditor.removeAttr('readonly');
			else
				$textEditor.attr('readonly', 'readonly');

			updateToolBar(readOnly);

			return this;
		};

		/**
		 * Updates the toolbar to disable/enable the appropriate buttons
		 * @private
		 */
		updateToolBar = function(disable) {
			$toolbar.find('.sceditor-button').removeClass('disabled');

			$toolbar.find('.sceditor-button').each(function () {
				var button = $(this);

				if(disable === true)
					button.addClass('disabled');
				else if(base.inSourceMode() && !button.data('sceditor-txtmode'))
					button.addClass('disabled');
				else if (!base.inSourceMode() && !button.data('sceditor-wysiwygmode'))
					button.addClass('disabled');
			});
		};

		/**
		 * Creates an array of all the key press functions
		 * like emoticons, ect.
		 * @private
		 */
		initKeyPressFuncs = function () {
			$.each(base.commands, function (command, values) {
				if(values.keyPress)
					keyPressFuncs.push(values.keyPress);
			});
		};

		/**
		 * Gets the width of the editor in px
		 *
		 * @since 1.3.5
		 * @function
		 * @memberOf jQuery.sceditor.prototype
		 * @name width
		 * @return {int}
		 */
		/**
		 * Sets the width of the editor
		 *
		 * @param {int} width Width in px
		 * @since 1.3.5
		 * @function
		 * @memberOf jQuery.sceditor.prototype
		 * @name width^2
		 * @return {this}
		 */
		base.width = function (width) {
			if(!width)
				return $editorContainer.width();

			$editorContainer.width(width);

			// fix the height and width of the textarea/iframe
			$wysiwygEditor.width(width);
			$wysiwygEditor.width(width + (width - $wysiwygEditor.outerWidth(true)));

			$textEditor.width(width);
			$textEditor.width(width + (width - $textEditor.outerWidth(true)));

			return this;
		};

		/**
		 * Gets the height of the editor in px
		 *
		 * @since 1.3.5
		 * @function
		 * @memberOf jQuery.sceditor.prototype
		 * @name height
		 * @return {int}
		 */
		/**
		 * Sets the height of the editor
		 *
		 * @param {int} height Height in px
		 * @since 1.3.5
		 * @function
		 * @memberOf jQuery.sceditor.prototype
		 * @name height^2
		 * @return {this}
		 */
		base.height = function (height) {
			if(!height)
				return $editorContainer.height();

			$editorContainer.height(height);

			height -= !base.options.toolbarContainer ? $toolbar.outerHeight(true) : 0;

			// fix the height and width of the textarea/iframe
			$wysiwygEditor.height(height);
			$wysiwygEditor.height(height + (height - $wysiwygEditor.outerHeight(true)));

			$textEditor.height(height);
			$textEditor.height(height + (height - $textEditor.outerHeight(true)));

			return this;
		};

		/**
		 * Expands the editor to the size of it's content
		 *
		 * @since 1.3.5
		 * @param {Boolean} [ignoreMaxHeight=false]
		 * @function
		 * @name expandToContent
		 * @memberOf jQuery.sceditor.prototype
		 * @see #resizeToContent
		 */
		base.expandToContent = function(ignoreMaxHeight) {
			var	doc		= getWysiwygDoc(),
				currentHeight	= $editorContainer.height(),
				height		= doc.body.scrollHeight || doc.documentElement.scrollHeight,
				padding		= (currentHeight - $wysiwygEditor.height()),
				maxHeight	= base.options.resizeMaxHeight || ((base.options.height || $textarea.height()) * 2);

			height += padding;

			if(ignoreMaxHeight !== true && height > maxHeight)
				height = maxHeight;

			if(height > currentHeight)
				base.height(height);
		};

		/**
		 * Creates the resizer.
		 * @private
		 */
		initResize = function () {
			var	$grip		= $('<div class="sceditor-grip" />'),
				// cover is used to cover the editor iframe so document still gets mouse move events
				$cover		= $('<div class="sceditor-resize-cover" />'),
				startX		= 0,
				startY		= 0,
				startWidth	= 0,
				startHeight	= 0,
				origWidth	= $editorContainer.width(),
				origHeight	= $editorContainer.height(),
				dragging	= false,
				minHeight, maxHeight, minWidth, maxWidth, mouseMoveFunc;

			minHeight = base.options.resizeMinHeight || origHeight / 1.5;
			maxHeight = base.options.resizeMaxHeight || origHeight * 2.5;
			minWidth = base.options.resizeMinWidth  || origWidth / 1.25;
			maxWidth = base.options.resizeMaxWidth || origWidth * 1.25;

			mouseMoveFunc = function (e) {
				var	newHeight = startHeight + (e.pageY - startY),
					newWidth  = startWidth  + (e.pageX - startX);

				if (newWidth >= minWidth && (maxWidth < 0 || newWidth <= maxWidth))
					base.width(newWidth);

				if (newHeight >= minHeight && (maxHeight < 0 || newHeight <= maxHeight))
					base.height(newHeight);

				e.preventDefault();
			};

			$editorContainer.append($grip);
			$editorContainer.append($cover.hide());

			$grip.mousedown(function (e) {
				startX		= e.pageX;
				startY		= e.pageY;
				startWidth	= $editorContainer.width();
				startHeight	= $editorContainer.height();
				dragging	= true;

				$editorContainer.addClass('resizing');
				$cover.show();
				$(document).bind('mousemove', mouseMoveFunc);
				e.preventDefault();
			});

			$(document).mouseup(function (e) {
				if(!dragging)
					return;

				dragging = false;
				$cover.hide();

				$editorContainer.removeClass('resizing');
				$(document).unbind('mousemove', mouseMoveFunc);
				e.preventDefault();
			});
		};

		/**
		 * Handles the forms submit event
		 * @private
		 */
		formSubmitHandler = function(e) {
			base.updateTextareaValue();
			$(this).removeAttr('novalidate');

			if(this.checkValidity && !this.checkValidity())
				e.preventDefault();

			$(this).attr('novalidate','novalidate');
			base.blur();
		};

		/**
		 * Destroys the editor, removing all elements and
		 * event handlers.
		 * 
		 * @function
		 * @name destory
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.destory = function () {
			$(document).unbind('click', documentClickHandler);
			$(window).unbind('resize', handleWindowResize);
			
			$(textarea.form).removeAttr('novalidate')
				.unbind('submit', formSubmitHandler)
				.unbind("reset", handleFormReset);

			$(getWysiwygDoc()).find('*').remove();
			$(getWysiwygDoc()).unbind("keypress mousedown beforedeactivate keyup focus paste keypress");

			$editorContainer.find('*').remove();
			$editorContainer.remove();

			$textarea.removeData("sceditor").removeData("sceditorbbcode").show();
		};

		/**
		 * Preloads the emoticon images
		 * Idea from: http://engineeredweb.com/blog/09/12/preloading-images-jquery-and-javascript
		 * @private
		 */
		initEmoticons = function () {
			// prefix emoticon root to emoticon urls
			if(base.options.emoticonsRoot && base.options.emoticons)
			{
				$.each(base.options.emoticons, function (idx, emoticons) {
					$.each(emoticons, function (key, url) {
						base.options.emoticons[idx][key] = base.options.emoticonsRoot + url;
					});
				});
			}

			var	emoticons = $.extend({}, base.options.emoticons.more, base.options.emoticons.dropdown, base.options.emoticons.hidden),
				emoticon;

			$.each(emoticons, function (key, url) {
				emoticon	= document.createElement('img');
				emoticon.src	= url;
				preLoadCache.push(emoticon);
			});
		};

		/**
		 * Creates a menu item drop down
		 *
		 * @param HTMLElement	menuItem	The button to align the drop down with
		 * @param string	dropDownName	Used for styling the dropown, will be a class sceditor-dropDownName
		 * @param string	content			The HTML content of the dropdown
		 * @param bool		ieUnselectable	If to add the unselectable attribute to all the contents elements. Stops IE from deselecting the text in the editor
		 * @function
		 * @name createDropDown
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.createDropDown = function (menuItem, dropDownName, content, ieUnselectable) {
			base.closeDropDown();

			// IE needs unselectable attr to stop it from unselecting the text in the editor.
			// The editor can cope if IE does unselect the text it's just not nice.
			if(ieUnselectable !== false) {
				content = $(content);
				content.find(':not(input,textarea)').filter(function() { return this.nodeType===1; }).attr('unselectable', 'on');
			}

			var o_css = {
				top: menuItem.offset().top,
				left: menuItem.offset().left
			};

			$.extend(o_css, base.options.dropDownCss);

			$dropdown = $('<div class="sceditor-dropdown sceditor-' + dropDownName + '" />').css(o_css).append(content);

			//$editorContainer.after($dropdown);
			$dropdown.appendTo($('body'));
			dropdownIgnoreLastClick = true;

			// stop clicks within the dropdown from being handled
			$dropdown.click(function (e) {
				e.stopPropagation();
			});
		};

		/**
		 * Handles any document click and closes the dropdown if open
		 * @private
		 */
		documentClickHandler = function (e) {
			// ignore right clicks
			if(!dropdownIgnoreLastClick && e.which !== 3)
				base.closeDropDown();

			dropdownIgnoreLastClick = false;
		};

		handlePasteEvt = function(e) {
			var	elm		= getWysiwygDoc().body,
				checkCount	= 0,
				pastearea	= elm.ownerDocument.createElement('div'),
				prePasteContent	= elm.ownerDocument.createDocumentFragment();

			rangeHelper.saveRange();
			document.body.appendChild(pastearea);

			if (e && e.clipboardData && e.clipboardData.getData)
			{
				var html, handled=true;

				if ((html = e.clipboardData.getData('text/html')) || (html = e.clipboardData.getData('text/plain')))
					pastearea.innerHTML = html;
				else
					handled = false;

				if(handled)
				{
					handlePasteData(elm, pastearea);

					if (e.preventDefault)
					{
						e.stopPropagation();
						e.preventDefault();
					}

					return false;
				}
			}

			while(elm.firstChild)
				prePasteContent.appendChild(elm.firstChild);

			function handlePaste(elm, pastearea) {
				if (elm.childNodes.length > 0)
				{
					while(elm.firstChild)
						pastearea.appendChild(elm.firstChild);

					while(prePasteContent.firstChild)
						elm.appendChild(prePasteContent.firstChild);

					handlePasteData(elm, pastearea);
				}
				else
				{
					// Allow max 25 checks before giving up.
					// Needed inscase empty input is posted or
					// something gose wrong.
					if(checkCount > 25)
					{
						while(prePasteContent.firstChild)
							elm.appendChild(prePasteContent.firstChild);

						return;
					}

					++checkCount;
					setTimeout(function () {
						handlePaste(elm, pastearea);
					}, 20);
				}
			}
			handlePaste(elm, pastearea);

			base.focus();

			return true;
		};

		/**
		 * @param {Element} elm
		 * @param {Element} pastearea
		 * @private
		 */
		handlePasteData = function(elm, pastearea) {
			// fix any invalid nesting
			$.sceditor.dom.fixNesting(pastearea);

			var pasteddata = pastearea.innerHTML;

			if(base.options.getHtmlHandler)
				pasteddata = base.options.getHtmlHandler(pasteddata, $(pastearea));

			pastearea.parentNode.removeChild(pastearea);

			if(base.options.getTextHandler)
				pasteddata = base.options.getTextHandler(pasteddata, true);

			rangeHelper.restoreRange();
			rangeHelper.insertHTML(pasteddata);
		};

		/**
		 * Closes the current drop down
		 *
		 * @param bool focus If to focus the editor on close
		 * @function
		 * @name closeDropDown
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.closeDropDown = function (focus) {
			if($dropdown) {
				$dropdown.remove();
				$dropdown = null;
			}

			if(focus === true)
				base.focus();
		};

		/**
		 * Gets the WYSIWYG editors document
		 * @private
		 */
		getWysiwygDoc = function () {
			if (wysiwygEditor.contentDocument)
				return wysiwygEditor.contentDocument;

			if (wysiwygEditor.contentWindow && wysiwygEditor.contentWindow.document)
				return wysiwygEditor.contentWindow.document;

			if (wysiwygEditor.document)
				return wysiwygEditor.document;

			return null;
		};


		/**
		 * <p>Inserts HTML into WYSIWYG editor.</p>
		 *
		 * <p>If endHtml is specified instead of the inserted HTML replacing the selected
		 * text the selected text will be placed between html and endHtml. If there is
		 * no selected text html and endHtml will be concated together.</p>
		 *
		 * @param {string} html
		 * @param {string} [endHtml=null]
		 * @param {boolean} [overrideCodeBlocking=false]
		 * @function
		 * @name wysiwygEditorInsertHtml
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.wysiwygEditorInsertHtml = function (html, endHtml, overrideCodeBlocking) {
			base.focus();

			// don't apply to code elements
			if(!overrideCodeBlocking && ($(rangeHelper.parentNode()).is('code') ||
				$(rangeHelper.parentNode()).parents('code').length !== 0))
				return;

			rangeHelper.insertHTML(html, endHtml);
		};

		/**
		 * Like wysiwygEditorInsertHtml except it will convert any HTML into text
		 * before inserting it.
		 *
		 * @param {String} text
		 * @param {String} [endText=null]
		 * @function
		 * @name wysiwygEditorInsertText
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.wysiwygEditorInsertText = function (text, endText) {
			var escape = function(str) {
				if(!str)
					return str;

				return str.replace(/&/g, "&amp;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;")
					.replace(/ /g, "&nbsp;")
					.replace(/\r\n|\r/g, "\n")
					.replace(/\n/g, "<br />");
			};

			base.wysiwygEditorInsertHtml(escape(text), escape(endText));
		};

		/**
		 * <p>Inserts text into either WYSIWYG or textEditor depending on which
		 * mode the editor is in.</p>
		 *
		 * <p>If endText is specified any selected text will be placed between
		 * text and endText. If no text is selected text and endText will
		 * just be concated together.</p>
		 *
		 * @param {String} text
		 * @param {String} [endText=null]
		 * @since 1.3.5
		 * @function
		 * @name insertText
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.insertText = function (text, endText) {
			if(base.inSourceMode())
				base.textEditorInsertText(text, endText);
			else
				base.wysiwygEditorInsertText(text, endText);

			return this;
		};

		/**
		 * Like wysiwygEditorInsertHtml but inserts text into the text
		 * (source mode) editor instead
		 *
		 * @param {String} text
		 * @param {String} [endText=null]
		 * @function
		 * @name textEditorInsertText
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.textEditorInsertText = function (text, endText) {
			var range, start, end, txtLen;

			textEditor.focus();

			if(typeof textEditor.selectionStart !== "undefined")
			{
				start	= textEditor.selectionStart;
				end	= textEditor.selectionEnd;
				txtLen	= text.length;

				if(endText)
					text += textEditor.value.substring(start, end) + endText;

				textEditor.value = textEditor.value.substring(0, start) + text + textEditor.value.substring(end, textEditor.value.length);

				if(endText)
					textEditor.selectionStart = (start + text.length) - endText.length;
				else
					textEditor.selectionStart = start + text.length;

				textEditor.selectionEnd = textEditor.selectionStart;
			}
			else if(typeof textEditor.selection.createRange !== "undefined")
			{
				range = document.selection.createRange();

				if(endText)
					text += range.text + endText;

				range.text = text;

				if(endText)
				{
					range.moveEnd('character', 0-endText.length);
					range.select();
				}
			}
			else
				textEditor.value += text + endText;

			textEditor.focus();
		};

		/**
		 * Gets the current rangeHelper instance
		 *
		 * @return jQuery.sceditor.rangeHelper
		 * @function
		 * @name getRangeHelper
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.getRangeHelper = function () {
			return rangeHelper;
		};

		/**
		 * Gets the value of the editor
		 *
		 * @since 1.3.5
		 * @return {string}
		 * @function
		 * @name val
		 * @memberOf jQuery.sceditor.prototype
		 */
		/**
		 * Sets the value of the editor
		 *
		 * @param {String} val
		 * @param {Boolean} [filter]
		 * @return {this}
		 * @since 1.3.5
		 * @function
		 * @name val^2
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.val = function (val, filter) {
			if(typeof val === "string")
			{
				if(base.inSourceMode())
					base.setTextareaValue(val);
				else
				{
					if(filter !== false && base.options.getTextHandler)
						val = base.options.getTextHandler(val);

					base.setWysiwygEditorValue(val);
				}

				return this;
			}

			return base.inSourceMode() ?
				base.getTextareaValue() :
				base.getWysiwygEditorValue();
		};

		/**
		 * <p>Inserts HTML/BBCode into the editor</p>
		 *
		 * <p>If end is supplied any slected text will be placed between
		 * start and end. If there is no selected text start and end
		 * will be concated together.</p>
		 *
		 * @param {String} start
		 * @param {String} [end=null]
		 * @param {Boolean} [filter=true]
		 * @param {Boolean} [convertEmoticons=true]
		 * @return {this}
		 * @since 1.3.5
		 * @function
		 * @name insert
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.insert = function (start, end, filter, convertEmoticons) {
			if(base.inSourceMode())
				base.textEditorInsertText(start, end);
			else
			{
				if(end)
				{
					var	html = base.getRangeHelper().selectedHtml(),
						frag = $('<div>').appendTo($('body')).hide().html(html);

					if(filter !== false && base.options.getHtmlHandler)
					{
						html = base.options.getHtmlHandler(html, frag);
						frag.remove();
					}

					start += html + end;
				}

				if(filter !== false && base.options.getTextHandler)
					start = base.options.getTextHandler(start, true);

				if(convertEmoticons !== false)
					start = replaceEmoticons(start);

				base.wysiwygEditorInsertHtml(start);
			}

			return this;
		};

		/**
		 * Gets the WYSIWYG editors HTML which is between the body tags
		 *
		 * @param {bool} [filter=true]
		 * @return {string}
		 * @function
		 * @name getWysiwygEditorValue
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.getWysiwygEditorValue = function (filter) {
			var	$body = $wysiwygEditor.contents().find("body"),
				html;

			// fix any invalid nesting
			$.sceditor.dom.fixNesting($body.get(0));
			html = $body.html();

			if(filter !== false && base.options.getHtmlHandler)
				html = base.options.getHtmlHandler(html, $body);

			return html;
		};

		/**
		 * Gets the text editor value
		 *
		 * @param {bool} [filter=true]
		 * @return {string}
		 * @function
		 * @name getTextareaValue
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.getTextareaValue = function (filter) {
			var val = $textEditor.val();

			if(filter !== false && base.options.getTextHandler)
				val = base.options.getTextHandler(val);

			return val;
		};

		/**
		 * Sets the WYSIWYG HTML editor value. Should only be the HTML
		 * contained within the body tags
		 *
		 * @param {string} value
		 * @function
		 * @name setWysiwygEditorValue
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.setWysiwygEditorValue = function (value) {
			if(!value)
				value = '<p>' + ($.sceditor.ie ? '' : '<br />') + '</p>';

			getWysiwygDoc().body.innerHTML = replaceEmoticons(value);
		};

		/**
		 * Sets the text editor value
		 *
		 * @param {string} value
		 * @function
		 * @name setTextareaValue
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.setTextareaValue = function (value) {
			$textEditor.val(value);
		};

		/**
		 * Updates the textarea that the editor is replacing
		 * with the value currently inside the editor.
		 *
		 * @function
		 * @name updateTextareaValue
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.updateTextareaValue = function () {
			if(base.inSourceMode())
				$textarea.val(base.getTextareaValue(false));
			else
				$textarea.val(base.getWysiwygEditorValue());
		};

		/**
		 * Replaces any emoticon codes in the passed HTML with their emoticon images
		 * @private
		 */
		replaceEmoticons = function (html) {
			if(base.options.toolbar.indexOf('emoticon') === -1)
				return html;

			var emoticons = $.extend({}, base.options.emoticons.more, base.options.emoticons.dropdown, base.options.emoticons.hidden);

			$.each(emoticons, function (key, url) {
				// escape the key before using it as a regex
				// and append the regex to only find emoticons outside
				// of HTML tags
				var	reg = $.sceditor.regexEscape(key) + "(?=([^\\<\\>]*?<(?!/code)|[^\\<\\>]*?$))",
					group = '';

				// Make sure the emoticon is surrounded by whitespace or is at the start/end of a string or html tag
				if(base.options.emoticonsCompat)
				{
					reg = "((>|^|\\s|\xA0|\u2002|\u2003|\u2009|&nbsp;))" + reg + "(?=(\\s|$|<|\xA0|\u2002|\u2003|\u2009|&nbsp;))";
					group = '$1';
				}

				html = html.replace(
					new RegExp(reg, 'gm'),
					group + _tmpl('emoticon', {key: key, url: url})
				);
			});

			return html;
		};

		/**
		 * If the editor is in source code mode
		 *
		 * @return {bool}
		 * @function
		 * @name inSourceMode
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.inSourceMode = function () {
			return $textEditor.is(':visible');
		};

		/**
		 * Gets if the editor is in sourceMode
		 *
		 * @return boolean
		 * @function
		 * @name sourceMode
		 * @memberOf jQuery.sceditor.prototype
		 */
		/**
		 * Sets if the editor is in sourceMode
		 *
		 * @param {bool} enable
		 * @return {this}
		 * @function
		 * @name sourceMode^2
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.sourceMode = function (enable) {
			if(typeof enable !== 'boolean')
				return base.inSourceMode();

			if((base.inSourceMode() && !enable) || (!base.inSourceMode() && enable))
				base.toggleTextMode();

			return this;
		};

		/**
		 * Switches between the WYSIWYG and plain text modes
		 *
		 * @function
		 * @name toggleTextMode
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.toggleTextMode = function () {
			// don't allow switching to WYSIWYG if doesn't support it
			if(!$.sceditor.isWysiwygSupported() && base.inSourceMode())
				return;

			if(base.inSourceMode())
				base.setWysiwygEditorValue(base.getTextareaValue());
			else
				base.setTextareaValue(base.getWysiwygEditorValue());

			lastRange = null;
			$textEditor.toggle();
			$wysiwygEditor.toggle();

			$editorContainer.removeClass('sourceMode');
			$editorContainer.removeClass('wysiwygMode');

			if(base.inSourceMode())
				$editorContainer.addClass('sourceMode');
			else
				$editorContainer.addClass('wysiwygMode');

			updateToolBar();
		};

		textEditorSelectedText = function () {
			textEditor.focus();

			if(textEditor.selectionStart != null)
				return textEditor.value.substring(textEditor.selectionStart, textEditor.selectionEnd);
			else if(document.selection.createRange)
				return document.selection.createRange().text;
		};

		/**
		 * Handles the passed command
		 * @private
		 */
		handleCommand = function (caller, command) {
			// check if in text mode and handle text commands
			if(base.inSourceMode())
			{
				if(command.txtExec)
				{
					if($.isArray(command.txtExec))
						base.textEditorInsertText.apply(base, command.txtExec);
					else
						command.txtExec.call(base, caller, textEditorSelectedText());
				}

				return;
			}

			if(!command.exec)
				return;

			if($.isFunction(command.exec))
				command.exec.call(base, caller);
			else
				base.execCommand(command.exec, command.hasOwnProperty("execParam") ? command.execParam : null);
		};

		/**
		 * Fucuses the editors input area
		 *
		 * @return {this}
		 * @function
		 * @name focus
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.focus = function () {
			if(!base.inSourceMode())
			{
				wysiwygEditor.contentWindow.focus();

				// Needed for IE < 9
				if(lastRange) {
					rangeHelper.selectRange(lastRange);

					// remove the stored range after being set.
					// If the editor loses focus it should be
					// saved again.
					lastRange = null;
				}
			}
			else
				textEditor.focus();

			return this;
		};
		
		/**
		 * Blurs the editors input area
		 *
		 * @return {this}
		 * @function
		 * @name blur
		 * @memberOf jQuery.sceditor.prototype
		 * @since 1.3.6
		 */
		base.blur = function () {
			// Must use an element that isn't display:hidden or visibility:hidden for iOS
			// so create a special blur element to use
			if(!$blurElm)
				$blurElm = $('<input style="width:0; height:0; opacity:0" type="text" />').appendTo($editorContainer);
			
			$blurElm.removeAttr("disabled")
                 		.focus()
                 		.blur()
                 		.attr("disabled", "disabled");

			return this;
		};

		/**
		 * Saves the current range. Needed for IE because it forgets
		 * where the cursor was and what was selected
		 * @private
		 */
		saveRange = function () {
			/* this is only needed for IE */
			if(!$.sceditor.ie)
				return;

			lastRange = rangeHelper.selectedRange();
		};

		/**
		 * Executes a command on the WYSIWYG editor
		 *
		 * @param {String|Function} command
		 * @param {String|Boolean} [param]
		 * @function
		 * @name execCommand
		 * @memberOf jQuery.sceditor.prototype
		 */
		base.execCommand = function (command, param) {
			var	executed	= false,
				$parentNode	= $(rangeHelper.parentNode());

			base.focus();

			// don't apply any comannds to code elements
			if($parentNode.is('code') || $parentNode.parents('code').length !== 0)
				return;

			if(getWysiwygDoc())
			{
				try
				{
					executed = getWysiwygDoc().execCommand(command, false, param);
				}
				catch (e) {}
			}

			// show error if execution failed and an error message exists
			if(!executed && base.commands[command] && base.commands[command].errorMessage)
				alert(base._(base.commands[command].errorMessage));
		};

		/**
		 * Handles any key press in the WYSIWYG editor
		 *
		 * @private
		 */
		handleKeyPress = function(e) {
			base.closeDropDown();

			var $parentNode = $(rangeHelper.parentNode());

			// "Fix" (ok it's a cludge) for blocklevel elements being duplicated in some browsers when
			// enter is pressed instead of inserting a newline
			if(e.which === 13)
			{
				if($parentNode.is('code,blockquote,pre') || $parentNode.parents('code,blockquote,pre').length !== 0)
				{
					lastRange = null;
					base.wysiwygEditorInsertHtml('<br />', null, true);
					return false;
				}
			}

			// make sure there is always a newline after code or quote tags
			var d = getWysiwygDoc();
			$.sceditor.dom.rTraverse(d.body, function(node) {
				if((node.nodeType === 3 && node.nodeValue !== "") ||
					node.nodeName.toLowerCase() === 'br') {
					// this is the last text or br node, if its in a code or quote tag
					// then add a newline after it
					if($(node).parents('code, blockquote').length > 0)
						$(d.body).append(d.createElement('br'));

					return false;
				}
			}, true);

			// don't apply to code elements
			if($parentNode.is('code') || $parentNode.parents('code').length !== 0)
				return;

			var i = keyPressFuncs.length;
			while(i--)
				keyPressFuncs[i].call(base, e, wysiwygEditor, $textEditor);
		};
		
		/**
		 * Handles any mousedown press in the WYSIWYG editor
		 * @private
		 */
		handleFormReset = function(e) {
			base.val($textarea.val());
		};

		/**
		 * Handles any mousedown press in the WYSIWYG editor
		 * @private
		 */
		handleMouseDown = function(e) {
			base.closeDropDown();
			lastRange = null;
		};

		/**
		 * Handles the window resize event. Needed to resize then editor
		 * when the window size changes in fluid deisgns.
		 * @ignore
		 */
		handleWindowResize = function() {
			if(base.options.height && base.options.height.toString().indexOf("%") > -1)
				base.height($editorContainer.parent().height() *
					(parseFloat(base.options.height) / 100));

			if(base.options.width && base.options.width.toString().indexOf("%") > -1)
				base.width($editorContainer.parent().width() *
					(parseFloat(base.options.width) / 100));
		};

		/**
		 * Translates the string into the locale language.
		 *
		 * Replaces any {0}, {1}, {2}, ect. with the params provided.
		 *
		 * @param {string} str
		 * @param {...String} args
		 * @return {string}
		 * @function
		 * @name _
		 * @memberOf jQuery.sceditor.prototype
		 */
		base._ = function() {
			var args = arguments;

			if(locale && locale[args[0]])
				args[0] = locale[args[0]];

			return args[0].replace(/\{(\d+)\}/g, function(str, p1) {
				return typeof args[p1-0+1] !== "undefined" ?
					args[p1-0+1] :
					'{' + p1 + '}';
			});
		};

		/**
		 * Init the locale variable with the specified locale if possible
		 * @private
		 * @return void
		 */
		initLocale = function() {
			if($.sceditor.locale[base.options.locale])
				locale = $.sceditor.locale[base.options.locale];
			else
			{
				var lang = base.options.locale.split("-");

				if($.sceditor.locale[lang[0]])
					locale = $.sceditor.locale[lang[0]];
			}

			if(locale && locale.dateFormat)
				base.options.dateFormat = locale.dateFormat;
		};

		// run the initializer
		init();
	}