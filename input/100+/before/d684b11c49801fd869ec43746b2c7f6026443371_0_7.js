function(el, options){
	var base = this, o;

	// Access to jQuery and DOM versions of element
	base.$el = $(el);
	base.el = el;

	// Add a reverse reference to the DOM object
	base.$el.data("keyboard", base);

	base.init = function(){
		base.options = o = $.extend(true, {}, $.keyboard.defaultOptions, options);

		// Shift and Alt key toggles, sets is true if a layout has more than one keyset - used for mousewheel message
		base.shiftActive = base.altActive = base.metaActive = base.sets = base.capsLock = false;
		base.lastKeyset = [false, false, false]; // [shift, alt, meta]
		// Class names of the basic key set - meta keysets are handled by the keyname
		base.rows = [ '', '-shift', '-alt', '-alt-shift' ];
		base.acceptedKeys = [];
		base.mappedKeys = {}; // for remapping manually typed in keys
		$('<!--[if lte IE 8]><script>jQuery("body").addClass("oldie");</script><![endif]--><!--[if IE]><script>jQuery("body").addClass("ie");</script><![endif]-->').appendTo('body').remove();
		base.msie = $('body').hasClass('oldie'); // Old IE flag, used for caret positioning
		base.allie = $('body').hasClass('ie'); // $.browser.msie being removed soon
		base.inPlaceholder = base.$el.attr('placeholder') || '';
		base.watermark = (typeof(document.createElement('input').placeholder) !== 'undefined' && base.inPlaceholder !== ''); // html 5 placeholder/watermark
		base.regex = $.keyboard.comboRegex; // save default regex (in case loading another layout changes it)
		base.decimal = ( /^\./.test(o.display.dec) ) ? true : false; // determine if US "." or European "," system being used
		// convert mouse repeater rate (characters per second) into a time in milliseconds.
		base.repeatTime = 1000/(o.repeatRate || 20);

		// Check if caret position is saved when input is hidden or loses focus
		// (*cough* all versions of IE and I think Opera has/had an issue as well
		base.temp = $('<input style="position:absolute;left:-9999em;top:-9999em;" type="text" value="testing">').appendTo('body').caret(3,3);
		// Also save caret position of the input if it is locked
		base.checkCaret = (o.lockInput || base.temp.hide().show().caret().start !== 3 ) ? true : false;
		base.temp.remove();
		base.lastCaret = { start:0, end:0 };

		base.temp = [ '', 0, 0 ]; // used when building the keyboard - [keyset element, row, index]

		// Bind events
		$.each('initialized visible change hidden canceled accepted beforeClose'.split(' '), function(i,f){
			if ($.isFunction(o[f])){
				base.$el.bind(f + '.keyboard', o[f]);
			}
		});

		// Close with esc key & clicking outside
		if (o.alwaysOpen) { o.stayOpen = true; }
		$(document).bind('mousedown.keyboard keyup.keyboard', function(e){
			base.escClose(e);
			// needed for IE to allow switching between keyboards smoothly
			if (base.allie && $(e.target).hasClass('ui-keyboard-input')) { $(e.target)[o.openOn](); }
		});

		// Display keyboard on focus
		base.$el
			.addClass('ui-keyboard-input ' + o.css.input)
			.attr({ 'aria-haspopup' : 'true', 'role' : 'textbox' });

		// add disabled/readonly class - dynamically updated on reveal
		if (base.$el.is(':disabled') || (base.$el.attr('readonly') && !base.$el.hasClass('ui-keyboard-lockedinput'))) {
			base.$el.addClass('ui-keyboard-nokeyboard');
		}
		if (o.openOn) {
			base.$el.bind(o.openOn + '.keyboard', function(){
				base.focusOn();
			});
		}

		// Add placeholder if not supported by the browser
		if (!base.watermark && base.$el.val() === '' && base.inPlaceholder !== '' && base.$el.attr('placeholder') !== '') {
			base.$el
				.addClass('ui-keyboard-placeholder') // css watermark style (darker text)
				.val( base.inPlaceholder );
		}

		base.$el.trigger( 'initialized.keyboard', [ base, base.el ] );

		// initialized with keyboard open
		if (o.alwaysOpen) {
			base.reveal();
		}

	};

	base.focusOn = function(){
		if (base.$el.is(':visible')) {
			// caret position is always 0,0 in webkit; and nothing is focused at this point... odd
			// save caret position in the input to transfer it to the preview
			base.lastCaret = base.$el.caret();
		}
		if (!base.isVisible || o.alwaysOpen) {
			clearTimeout(base.timer);
			base.reveal();
			setTimeout(function(){ base.$preview.focus(); }, 100);
		}
	};

	base.reveal = function(){
		// close all keyboards
		$('.ui-keyboard:not(.ui-keyboard-always-open)').hide();

		// Don't open if disabled
		if (base.$el.is(':disabled') || (base.$el.attr('readonly') && !base.$el.hasClass('ui-keyboard-lockedinput'))) {
			base.$el.addClass('ui-keyboard-nokeyboard');
			return;
		} else {
			base.$el.removeClass('ui-keyboard-nokeyboard');
		}

		// Unbind focus to prevent recursion - openOn may be empty if keyboard is opened externally
		if (o.openOn) {
			base.$el.unbind( o.openOn + '.keyboard' );
		}

		// build keyboard if it doesn't exist
		if (typeof(base.$keyboard) === 'undefined') { base.startup(); }

		// ui-keyboard-has-focus is applied in case multiple keyboards have alwaysOpen = true and are stacked
		$('.ui-keyboard-has-focus').removeClass('ui-keyboard-has-focus');
		$('.ui-keyboard-input-current').removeClass('ui-keyboard-input-current');

		base.$el.addClass('ui-keyboard-input-current');
		base.isCurrent = true;

		// clear watermark
		if (!base.watermark && base.el.value === base.inPlaceholder) {
			base.$el
				.removeClass('ui-keyboard-placeholder')
				.val('');
		}
		// save starting content, in case we cancel
		base.originalContent = base.$el.val();
		base.$preview.val( base.originalContent );

		// disable/enable accept button
		if (o.acceptValid) { base.checkValid(); }

		// get single target position || target stored in element data (multiple targets) || default, at the element
		var p, s, position = o.position;
		position.of = position.of || base.$el.data('keyboardPosition') || base.$el;
		position.collision = (o.usePreview) ? position.collision || 'fit fit' : 'flip flip';

		if (o.resetDefault) {
			base.shiftActive = base.altActive = base.metaActive = false;
			base.showKeySet();
		}

		// show & position keyboard
		base.$keyboard
			// basic positioning before it is set by position utility
			.css({ position: 'absolute', left: 0, top: 0 })
			.addClass('ui-keyboard-has-focus')
			.show();

		// adjust keyboard preview window width - save width so IE won't keep expanding (fix issue #6)
		if (o.usePreview && base.msie) {
			if (typeof base.width === 'undefined') {
				base.$preview.hide(); // preview is 100% browser width in IE7, so hide the damn thing
				base.width = Math.ceil(base.$keyboard.width()); // set input width to match the widest keyboard row
				base.$preview.show();
			}
			base.$preview.width(base.width);
		}

		base.$keyboard.position(position); // position after keyboard is visible (required for UI position utility) and appropriately sized (*cough*)

		$(window).resize(function(){
			if (base.isVisible) {
				base.$keyboard.position(position);
			}
		});

		base.$preview.focus();
		base.isVisible = true;

		base.checkDecimal();

		// get preview area line height
		// add roughly 4px to get line height from font height, works well for font-sizes from 14-36px - needed for textareas
		base.lineHeight = parseInt( base.$preview.css('lineHeight'), 10) || parseInt(base.$preview.css('font-size') ,10) + 4;

		// IE caret haxx0rs
		if (base.allie){
			// ensure caret is at the end of the text (needed for IE)
			s = base.lastCaret.start || base.originalContent.length;
			p = { start: s, end: s };
			if (!base.lastCaret) { base.lastCaret = p; } // set caret at end of content, if undefined
			if (base.lastCaret.end === 0 && base.lastCaret.start > 0) { base.lastCaret.end = base.lastCaret.start; } // sometimes end = 0 while start is > 0
			if (base.lastCaret.start < 0) { base.lastCaret = p; } // IE will have start -1, end of 0 when not focused (see demo: http://jsfiddle.net/Mottie/fgryQ/3/).
		}
		base.$preview.caret(base.lastCaret.start, base.lastCaret.end );

		base.$el.trigger( 'visible.keyboard', [ base, base.el ] );
		return base;
	};

	base.startup = function(){
		base.$keyboard = base.buildKeyboard();
		base.$allKeys = base.$keyboard.find('button.ui-keyboard-button');
		base.preview = base.$preview[0];
		base.$decBtn = base.$keyboard.find('.ui-keyboard-dec');
		base.wheel = $.isFunction( $.fn.mousewheel ); // is mousewheel plugin loaded?
		// keyCode of keys always allowed to be typed - caps lock, page up & down, end, home, arrow, insert & delete keys
		base.alwaysAllowed = [20,33,34,35,36,37,38,39,40,45,46];
		if (o.enterNavigation) { base.alwaysAllowed.push(13); } // add enter to allowed keys
		base.$preview
			.bind('keypress.keyboard', function(e){
				var k = String.fromCharCode(e.charCode || e.which);
				if (base.checkCaret) { base.lastCaret = base.$preview.caret(); }

				// update caps lock - can only do this while typing =(
				base.capsLock = (((k >= 65 && k <= 90) && !e.shiftKey) || ((k >= 97 && k <= 122) && e.shiftKey)) ? true : false;

				// restrict input - keyCode in keypress special keys: see http://www.asquare.net/javascript/tests/KeyCode.html
				if (o.restrictInput) {
					// allow navigation keys to work - Chrome doesn't fire a keypress event (8 = bksp)
					if ( (e.which === 8 || e.which === 0) && $.inArray( e.keyCode, base.alwaysAllowed ) ) { return; }
					if ($.inArray(k, base.acceptedKeys) === -1) { e.preventDefault(); } // quick key check
				} else if ( (e.ctrlKey || e.metaKey) && (e.which === 97 || e.which === 99 || e.which === 118 || (e.which >= 120 && e.which <=122)) ) {
					// Allow select all (ctrl-a:97), copy (ctrl-c:99), paste (ctrl-v:118) & cut (ctrl-x:120) & redo (ctrl-y:121)& undo (ctrl-z:122); meta key for mac
					return;
				}
				// Mapped Keys - allows typing on a regular keyboard and the mapped key is entered
				// Set up a key in the layout as follows: "m(a):label"; m = key to map, (a) = actual keyboard key to map to (optional), ":label" = title/tooltip (optional)
				// example: \u0391 or \u0391(A) or \u0391:alpha or \u0391(A):alpha
				if (base.hasMappedKeys) {
					if (base.mappedKeys.hasOwnProperty(k)){
						base.insertText( base.mappedKeys[k] );
						e.preventDefault();
					}
				}
				base.checkMaxLength();

			})
			.bind('keyup.keyboard', function(e){
				switch (e.which) {
					// Insert tab key
					case 9 :
						// Added a flag to prevent from tabbing into an input, keyboard opening, then adding the tab to the keyboard preview
						// area on keyup. Sadly it still happens if you don't release the tab key immediately because keydown event auto-repeats
						if (base.tab && !o.lockInput) {
							$.keyboard.keyaction.tab(base);
							base.tab = false;
						} else {
							e.preventDefault();
						}
						break;

					// Escape will hide the keyboard
					case 27:
						base.close();
						return false;
				}

				// throttle the check combo function because fast typers will have an incorrectly positioned caret
				clearTimeout(base.throttled);
				base.throttled = setTimeout(function(){
					base.checkCombos();
				}, 100);

				base.checkMaxLength();
				base.$el.trigger( 'change.keyboard', [ base, base.el ] );
			})
			.bind('keydown.keyboard', function(e){
				switch (e.which) {
					// prevent tab key from leaving the preview window
					case 9 :
						if (o.tabNavigation) {
							// allow tab to pass through - tab to next input/shift-tab for prev
							return true;
						} else {
							base.tab = true; // see keyup comment above
							return false;
						}

					case 13:
						$.keyboard.keyaction.enter(base, null, e);
						break;

					// Show capsLock
					case 20:
						base.shiftActive = base.capsLock = !base.capsLock;
						base.showKeySet(this);
						break;

					case 86:
						// prevent ctrl-v/cmd-v
						if (e.ctrlKey || e.metaKey) {
							if (o.preventPaste) { e.preventDefault(); return; }
							base.checkCombos(); // check pasted content
						}
						break;
				}
			})
			.bind('mouseup.keyboard', function(){
				if (base.checkCaret) { base.lastCaret = base.$preview.caret(); }
			});

		// If preventing paste, block context menu (right click)
		if (o.preventPaste){
			base.$preview.bind('contextmenu.keyboard', function(e){ e.preventDefault(); });
			base.$el.bind('contextmenu.keyboard', function(e){ e.preventDefault(); });
		}

		if (o.appendLocally) {
			base.$el.after( base.$keyboard );
		} else {
			base.$keyboard.appendTo('body');
		}

		base.$allKeys
			.bind(o.keyBinding.split(' ').join('.keyboard ') + '.keyboard repeater.keyboard', function(e){
				// 'key', { action: doAction, original: n, curTxt : n, curNum: 0 }
				var txt, key = $.data(this, 'key'), action = key.action.split(':')[0];
				base.$preview.focus();
				// Start caret in IE when not focused (happens with each virtual keyboard button click
				if (base.checkCaret) { base.$preview.caret( base.lastCaret.start, base.lastCaret.end ); }
				if (action.match('meta')) { action = 'meta'; }
				if ($.keyboard.keyaction.hasOwnProperty(action) && $(this).hasClass('ui-keyboard-actionkey')) {
					// stop processing if action returns false (close & cancel)
					if ($.keyboard.keyaction[action](base,this,e) === false) { return; }
				} else if (typeof key.action !== 'undefined') {
					txt = (base.wheel && !$(this).hasClass('ui-keyboard-actionkey')) ? key.curTxt : key.action;
					base.insertText(txt);
					if (!base.capsLock && !o.stickyShift && !e.shiftKey) {
						base.shiftActive = false;
						base.showKeySet(this);
					}
				}
				base.checkCombos();
				base.checkMaxLength();
				base.$el.trigger( 'change.keyboard', [ base, base.el ] );
				base.$preview.focus();
				e.preventDefault();
			})
			// Change hover class and tooltip
			.bind('mouseenter.keyboard mouseleave.keyboard', function(e){
				var el = this, $this = $(this),
					// 'key' = { action: doAction, original: n, curTxt : n, curNum: 0 }
					key = $.data(el, 'key');
				if (e.type === 'mouseenter' && base.el.type !== 'password' ){
					$this
						.addClass(o.css.buttonHover)
						.attr('title', function(i,t){
							// show mouse wheel message
							return (base.wheel && t === '' && base.sets) ? o.wheelMessage : t;
						});
				}
				if (e.type === 'mouseleave'){
					key.curTxt = key.original;
					key.curNum = 0;
					$.data(el, 'key', key);
					$this
						.removeClass( (base.el.type === 'password') ? '' : o.css.buttonHover) // needed or IE flickers really bad
						.attr('title', function(i,t){ return (t === o.wheelMessage) ? '' : t; })
						.find('span').text( key.original ); // restore original button text
				}
			})
			// Allow mousewheel to scroll through other key sets of the same key
			.bind('mousewheel.keyboard', function(e, delta){
				if (base.wheel) {
					var txt, $this = $(this), key = $.data(this, 'key');
					txt = key.layers || base.getLayers( $this );
					key.curNum += (delta > 0) ? -1 : 1;
					if (key.curNum > txt.length-1) { key.curNum = 0; }
					if (key.curNum < 0) { key.curNum = txt.length-1; }
					key.layers = txt;
					key.curTxt = txt[key.curNum];
					$.data(this, 'key', key);
					$this.find('span').text( txt[key.curNum] );
					return false;
				}
			})
			// using "kb" namespace for mouse repeat functionality to keep it separate
			// I need to trigger a "repeater.keyboard" to make it work
			.bind('mouseup.keyboard mouseleave.kb touchend.kb touchmove.kb touchcancel.kb', function(){
				if (base.isVisible && base.isCurrent) { base.$preview.focus(); }
				base.mouseRepeat = [false,''];
				clearTimeout(base.repeater); // make sure key repeat stops!
				if (base.checkCaret) { base.$preview.caret( base.lastCaret.start, base.lastCaret.end ); }
				return false;
			})
			// prevent form submits when keyboard is bound locally - issue #64
			.bind('click.keyboard', function(){
				return false;
			})
			// no mouse repeat for action keys (shift, ctrl, alt, meta, etc)
			.filter(':not(.ui-keyboard-actionkey)')
			// mouse repeated action key exceptions
			.add('.ui-keyboard-tab, .ui-keyboard-bksp, .ui-keyboard-space, .ui-keyboard-enter', base.$keyboard)
			.bind('mousedown.kb touchstart.kb', function(){
				if (o.repeatRate !== 0) {
					var key = $(this);
					base.mouseRepeat = [true, key]; // save the key, make sure we are repeating the right one (fast typers)
					setTimeout(function() {
						if (base.mouseRepeat[0] && base.mouseRepeat[1] === key) { base.repeatKey(key); }
					}, o.repeatDelay);
				}
				return false;
			});

	};

	// Insert text at caret/selection - thanks to Derek Wickwire for fixing this up!
	base.insertText = function(txt){
		var bksp, t, h,
			// use base.$preview.val() instead of base.preview.value (val.length includes carriage returns in IE).
			val = base.$preview.val(),
			pos = base.$preview.caret(),
			scrL = base.$preview.scrollLeft(),
			scrT = base.$preview.scrollTop(),
			len = val.length; // save original content length

		// silly IE caret hacks... it should work correctly, but navigating using arrow keys in a textarea is still difficult
		if (pos.end < pos.start) { pos.end = pos.start; } // in IE, pos.end can be zero after input loses focus
		if (pos.start > len) { pos.end = pos.start = len; }

		if (base.preview.tagName === 'TEXTAREA') {
			// This makes sure the caret moves to the next line after clicking on enter (manual typing works fine)
			if (base.msie && val.substr(pos.start, 1) === '\n') { pos.start += 1; pos.end += 1; }
			// Set scroll top so current text is in view - needed for virtual keyboard typing, not manual typing
			// this doesn't appear to work correctly in Opera
			h = (val.split('\n').length - 1);
			base.preview.scrollTop = (h>0) ? base.lineHeight * h : scrT;
		}

		bksp = (txt === 'bksp' && pos.start === pos.end) ? true : false;
		txt = (txt === 'bksp') ? '' : txt;
		t = pos.start + (bksp ? -1 : txt.length);
		scrL += parseInt(base.$preview.css('fontSize'),10) * (txt === 'bksp' ? -1 : 1);

		base.$preview
			.val( base.$preview.val().substr(0, pos.start - (bksp ? 1 : 0)) + txt + base.$preview.val().substr(pos.end) )
			.caret(t, t)
			.scrollLeft(scrL);

		if (base.checkCaret) { base.lastCaret = { start: t, end: t }; } // save caret in case of bksp

	};

	// check max length
	base.checkMaxLength = function(){
		var t, p = base.$preview.val();
		if (o.maxLength !== false && p.length > o.maxLength) {
			t = Math.min(base.$preview.caret().start, o.maxLength); 
			base.$preview.val( p.substring(0, o.maxLength) );
			// restore caret on change, otherwise it ends up at the end.
			base.$preview.caret( t, t );
			base.lastCaret = { start: t, end: t };
		}
		if (base.$decBtn.length) {
			base.checkDecimal();
		}
	};

	// mousedown repeater
	base.repeatKey = function(key){
		key.trigger('repeater.keyboard');
		if (base.mouseRepeat[0]) {
			base.repeater = setTimeout(function() {
				base.repeatKey(key);
			}, base.repeatTime);
		}
	};

	base.showKeySet = function(el){
		var key = '',
		toShow = (base.shiftActive ? 1 : 0) + (base.altActive ? 2 : 0);
		if (!base.shiftActive) { base.capsLock = false; }
		// check meta key set
		if (base.metaActive) {
			// the name attribute contains the meta set # "meta99"
			key = (el && el.name && /meta/.test(el.name)) ? el.name : '';
			// save active meta keyset name
			if (key === '') {
				key = (base.metaActive === true) ? '' : base.metaActive;
			} else {
				base.metaActive = key;
			}
			// if meta keyset doesn't have a shift or alt keyset, then show just the meta key set
			if ( (!o.stickyShift && base.lastKeyset[2] !== base.metaActive) ||
				( (base.shiftActive || base.altActive) && !base.$keyboard.find('.ui-keyboard-keyset-' + key + base.rows[toShow]).length) ) {
				base.shiftActive = base.altActive = false;
			}
		} else if (!o.stickyShift && base.lastKeyset[2] !== base.metaActive && base.shiftActive) {
			// switching from meta key set back to default, reset shift & alt if using stickyShift
			base.shiftActive = base.altActive = false;
		}
		toShow = (base.shiftActive ? 1 : 0) + (base.altActive ? 2 : 0);
		key = (toShow === 0 && !base.metaActive) ? '-default' : (key === '') ? '' : '-' + key;
		if (!base.$keyboard.find('.ui-keyboard-keyset' + key + base.rows[toShow]).length) {
			// keyset doesn't exist, so restore last keyset settings
			base.shiftActive = base.lastKeyset[0];
			base.altActive = base.lastKeyset[1];
			base.metaActive = base.lastKeyset[2];
			return;
		}
		base.$keyboard
			.find('.ui-keyboard-alt, .ui-keyboard-shift, .ui-keyboard-actionkey[class*=meta]').removeClass(o.css.buttonAction).end()
			.find('.ui-keyboard-alt')[(base.altActive) ? 'addClass' : 'removeClass'](o.css.buttonAction).end()
			.find('.ui-keyboard-shift')[(base.shiftActive) ? 'addClass' : 'removeClass'](o.css.buttonAction).end()
			.find('.ui-keyboard-lock')[(base.capsLock) ? 'addClass' : 'removeClass'](o.css.buttonAction).end()
			.find('.ui-keyboard-keyset').hide().end()
			.find('.ui-keyboard-keyset' + key + base.rows[toShow]).show().end()
			.find('.ui-keyboard-actionkey.ui-keyboard' + key).addClass(o.css.buttonAction);
		base.lastKeyset = [ base.shiftActive, base.altActive, base.metaActive ];
	};

	// check for key combos (dead keys)
	base.checkCombos = function(){
		var i, r, t, t2,
			// use base.$preview.val() instead of base.preview.value (val.length includes carriage returns in IE).
			val = base.$preview.val(),
			pos = base.$preview.caret(),
			len = val.length; // save original content length

		// silly IE caret hacks... it should work correctly, but navigating using arrow keys in a textarea is still difficult
		if (pos.end < pos.start) { pos.end = pos.start; } // in IE, pos.end can be zero after input loses focus
		if (pos.start > len) { pos.end = pos.start = len; }
		// This makes sure the caret moves to the next line after clicking on enter (manual typing works fine)
		if (base.msie && val.substr(pos.start, 1) === '\n') { pos.start += 1; pos.end += 1; }

		if (o.useCombos) {
			// keep 'a' and 'o' in the regex for ae and oe ligature (æ,œ)
			// thanks to KennyTM: http://stackoverflow.com/questions/4275077/replace-characters-to-make-international-letters-diacritics
			// original regex /([`\'~\^\"ao])([a-z])/mig moved to $.keyboard.comboRegex
			val = val.replace(base.regex, function(s, accent, letter){
				return (o.combos.hasOwnProperty(accent)) ? o.combos[accent][letter] || s : s;
			});
		}

		// check input restrictions - in case content was pasted
		if (o.restrictInput && val !== '') {
			t = val;
			r = base.acceptedKeys.length;
			for (i=0; i < r; i++){
				if (t === '') { continue; }
				t2 = base.acceptedKeys[i];
				if (val.indexOf(t2) >= 0) {
					// escape out all special characters
					if (/[\[|\]|\\|\^|\$|\.|\||\?|\*|\+|\(|\)|\{|\}]/g.test(t2)) { t2 = '\\' + t2; }
					t = t.replace( (new RegExp(t2, "g")), '');
				}
			}
			// what's left over are keys that aren't in the acceptedKeys array
			if (t !== '') { val = val.replace(t, ''); }
		}

		// save changes, then reposition caret
		pos.start += val.length - len;
		pos.end += val.length - len;
		base.$preview.val(val);

		base.$preview.caret(pos.start, pos.end);

		// calculate current cursor scroll location and set scrolltop to keep it in view
		base.preview.scrollTop = base.lineHeight * (val.substring(0, pos.start).split('\n').length - 1); // find row, multiply by font-size

		base.lastCaret = { start: pos.start, end: pos.end };

		if (o.acceptValid) { base.checkValid(); }

		return val; // return text, used for keyboard closing section
	};

	// Toggle accept button if validating
	base.checkValid = function(){
		var valid = true;
		if (o.validate && typeof o.validate === "function") {
			 valid = o.validate(base, base.$preview.val(), false);
		}
		// toggle accept button, "disabled" class defined in the css
		base.$keyboard.find('.ui-keyboard-accept')
			[valid ? 'removeClass' : 'addClass']('disabled')
			[valid ? 'removeAttr' : 'attr']('disabled', 'disabled')
			.attr('aria-disabled', !valid);
	};

	// Decimal button for num pad - only allow one (not used by default)
	base.checkDecimal = function(){
		// Check US "." or European "," format
		if ( ( base.decimal && /\./g.test(base.preview.value) ) || ( !base.decimal && /\,/g.test(base.preview.value) ) ) {
			base.$decBtn
				.attr({ 'disabled': 'disabled', 'aria-disabled': 'true' })
				.removeClass(o.css.buttonDefault + ' ' + o.css.buttonHover)
				.addClass(o.css.buttonDisabled);
		} else {
			base.$decBtn
				.removeAttr('disabled')
				.attr({ 'aria-disabled': 'false' })
				.addClass(o.css.buttonDefault)
				.removeClass(o.css.buttonDisabled);
		}
	};

	// get other layer values for a specific key
	base.getLayers = function(el){
		var key, keys;
		key = el.attr('data-pos');
		keys = el.closest('.ui-keyboard').find('button[data-pos="' + key + '"]').map(function(){
			// added '> span' because jQuery mobile adds multiple spans inside the button
			return $(this).find('> span').text();
		}).get();
		return keys;
	};

	// Go to next or prev inputs
	// goToNext = true, then go to next input; if false go to prev
	// isAccepted is from autoAccept option or true if user presses shift-enter
	base.switchInput = function(goToNext, isAccepted){
		if (typeof o.switchInput === "function") {
			o.switchInput(base, goToNext, isAccepted);
		} else {
			var stopped = false,
				all = $('.ui-keyboard-input'),
				indx = all.index(base.$el) + (goToNext ? 1 : -1);
			if (indx > all.length - 1) {
				stopped = o.stopAtEnd;
				indx = 0; // go to first input
			}
			if (indx < 0) {
				stopped = o.stopAtEnd;
				indx = all.length - 1; // stop or go to last
			}
			if (!stopped) {
				base.close(isAccepted);
				all.eq(indx)[o.openOn]();
			}
		}
		return false;
	};

	// Close the keyboard, if visible. Pass a status of true, if the content was accepted (for the event trigger).
	base.close = function(accepted){
		if (base.isVisible) {
			clearTimeout(base.throttled);
			var val = (accepted) ?  base.checkCombos() : base.originalContent;
			// validate input if accepted
			if (accepted && o.validate && typeof(o.validate) === "function" && !o.validate(base, val, true)) {
				val = base.originalContent;
				accepted = false;
			}
			base.isCurrent = false;
			base.$el
				.removeClass('ui-keyboard-input-current ui-keyboard-autoaccepted')
				// add "ui-keyboard-autoaccepted" to inputs
				.addClass( (accepted || false) ? accepted === true ? '' : 'ui-keyboard-autoaccepted' : '' )
				.trigger( (o.alwaysOpen) ? '' : 'beforeClose.keyboard', [ base, base.el, (accepted || false) ] )
				.val( val )
				.scrollTop( base.el.scrollHeight )
				.trigger( ((accepted || false) ? 'accepted.keyboard' : 'canceled.keyboard'), [ base, base.el ] )
				.trigger( (o.alwaysOpen) ? 'inactive.keyboard' : 'hidden.keyboard', [ base, base.el ] )
				.blur();
			if (o.openOn) {
				// rebind input focus - delayed to fix IE issue #72
				base.timer = setTimeout(function(){
					base.$el.bind( o.openOn + '.keyboard', function(){ base.focusOn(); });
					// remove focus from element (needed for IE since blur doesn't seem to work)
					if ($(':focus')[0] === base.el) { base.$el.blur(); }
				}, 100);
			}
			if (!o.alwaysOpen) {
				base.$keyboard.hide();
				base.isVisible = false;
			}
			if (!base.watermark && base.el.value === '' && base.inPlaceholder !== '') {
				base.$el
					.addClass('ui-keyboard-placeholder')
					.val(base.inPlaceholder);
			}
		}
		return false;
	};

	base.accept = function(){
		base.close(true);
	};

	base.escClose = function(e){
		// keep keyboard open if alwaysOpen or stayOpen is true - fixes mutliple always open keyboards or single stay open keyboard
		if ( !base.isVisible || (o.alwaysOpen && !base.isCurrent) || (!o.alwaysOpen && o.stayOpen && base.isCurrent) ) { return; }
		if ( e.type === 'keyup' && e.which === 27 ) { return base.close(); }

		// ignore autoaccept if using escape - good idea?
		if ( e.target !== base.el && $(e.target).closest('.ui-keyboard')[0] !== base.$keyboard[0] ) {
			// stop propogation in IE - an input getting focus doesn't open a keyboard if one is already open
			if ( base.allie ) {
				e.preventDefault();
			}
			base.close( o.autoAccept ? 'true' : false );
		}
	};

	// Build default button
	base.keyBtn = $('<button />')
		.attr({ 'role': 'button', 'aria-disabled': 'false', 'tabindex' : '-1' })
		.addClass('ui-keyboard-button');

	// Add key function
	// keyName = the name of the function called in $.keyboard.keyaction when the button is clicked
	// name = name added to key, or cross-referenced in the display options
	// newSet = keyset to attach the new button
	// regKey = true when it is not an action key
	base.addKey = function(keyName, name, regKey){
		var t, keyType, m, map, nm,
			n = (regKey === true) ? keyName : o.display[name] || keyName,
			kn = (regKey === true) ? keyName.charCodeAt(0) : keyName;
		// map defined keys - format "key(A):Label_for_key"
		// "key" = key that is seen (can any character; but it might need to be escaped using "\" or entered as unicode "\u####"
		// "(A)" = the actual key on the real keyboard to remap, ":Label_for_key" ends up in the title/tooltip
		if (/\(.+\)/.test(n)) { // n = "\u0391(A):alpha"
			map = n.replace(/\(([^()]+)\)/, ''); // remove "(A)", left with "\u0391:alpha"
			m = n.match(/\(([^()]+)\)/)[1]; // extract "A" from "(A)"
			n = map;
			nm = map.split(':');
			map = (nm[0] !== '' && nm.length > 1) ? nm[0] : map; // get "\u0391" from "\u0391:alpha"
			base.mappedKeys[m] = map;
		}

		// find key label
		nm = n.split(':');
		if (nm[0] === '' && nm[1] === '') { n = ':'; } // corner case of ":(:):;" reduced to "::;", split as ["", "", ";"]
		n = (nm[0] !== '' && nm.length > 1) ? $.trim(nm[0]) : n;
		t = (nm.length > 1) ? $.trim(nm[1]).replace(/_/g, " ") || '' : ''; // added to title

		// Action keys will have the 'ui-keyboard-actionkey' class
		// '\u2190'.length = 1 because the unicode is converted, so if more than one character, add the wide class
		keyType = (n.length > 1) ? ' ui-keyboard-widekey' : '';
		keyType += (regKey) ? '' : ' ui-keyboard-actionkey';
		return base.keyBtn
			.clone()
			.attr({ 'data-value' : n, 'name': kn, 'data-pos': base.temp[1] + ',' + base.temp[2], 'title' : t })
			.data('key', { action: keyName, original: n, curTxt : n, curNum: 0 })
			// add "ui-keyboard-" + keyName, if this is an action key (e.g. "Bksp" will have 'ui-keyboard-bskp' class)
			// add "ui-keyboard-" + unicode of 1st character (e.g. "~" is a regular key, class = 'ui-keyboard-126' (126 is the unicode value - same as typing &#126;)
			.addClass('ui-keyboard-' + kn + keyType + ' ' + o.css.buttonDefault)
			.html('<span>' + n + '</span>')
			.appendTo(base.temp[0]);
	};

	base.buildKeyboard = function(){
		var action, row, newSet, isAction,
			currentSet, key, keys, margin,
			sets = 0,

		container = $('<div />')
			.addClass('ui-keyboard ' + o.css.container + (o.alwaysOpen ? ' ui-keyboard-always-open' : '') )
			.attr({ 'role': 'textbox' })
			.hide();

		// build preview display
		if (o.usePreview) {
			base.$preview = base.$el.clone(false)
				.removeAttr('id')
				.removeClass('ui-keyboard-placeholder ui-keyboard-input')
				.addClass('ui-keyboard-preview ' + o.css.input)
				.attr('tabindex', '-1')
				.show(); // for hidden inputs
			// build preview container and append preview display
			$('<div />')
				.addClass('ui-keyboard-preview-wrapper')
				.append(base.$preview)
				.appendTo(container);
		} else {
			// No preview display, use element and reposition the keyboard under it.
			base.$preview = base.$el;
			o.position.at = o.position.at2;
		}
		if (o.lockInput) {
			base.$preview.addClass('ui-keyboard-lockedinput').attr({ 'readonly': 'readonly'});
		}

		// verify layout or setup custom keyboard
		if (o.layout === 'custom' || !$.keyboard.layouts.hasOwnProperty(o.layout)) {
			o.layout = 'custom';
			$.keyboard.layouts.custom = o.customLayout || { 'default' : ['{cancel}'] };
		}

		// Main keyboard building loop
		$.each($.keyboard.layouts[o.layout], function(set, keySet){
			if (set !== "") {
				sets++;
				newSet = $('<div />')
					.attr('name', set) // added for typing extension
					.addClass('ui-keyboard-keyset ui-keyboard-keyset-' + set)
					.appendTo(container)[(set === 'default') ? 'show' : 'hide']();

				for ( row = 0; row < keySet.length; row++ ){

					// remove extra spaces before spliting (regex probably could be improved)
					currentSet = $.trim(keySet[row]).replace(/\{(\.?)[\s+]?:[\s+]?(\.?)\}/g,'{$1:$2}');
					keys = currentSet.split(/\s+/);

					for ( key = 0; key < keys.length; key++ ) {
						// used by addKey function
						base.temp = [ newSet, row, key ];
						isAction = false;

						// ignore empty keys
						if (keys[key].length === 0) { continue; }

						// process here if it's an action key
						if( /^\{\S+\}$/.test(keys[key])){
							action = keys[key].match(/^\{(\S+)\}$/)[1].toLowerCase();
							if (/\!\!/.test(action)) {
								action = action.replace('!!','');
								isAction = true;
							}

							// add empty space
							if (/^sp:((\d+)?([\.|,]\d+)?)(em|px)?$/.test(action)) {
								// not perfect globalization, but allows you to use {sp:1,1em}, {sp:1.2em} or {sp:15px}
								margin = parseFloat( action.replace(/,/,'.').match(/^sp:((\d+)?([\.|,]\d+)?)(em|px)?$/)[1] || 0 );
								$('<span>&nbsp;</span>')
									// previously {sp:1} would add 1em margin to each side of a 0 width span
									// now Firefox doesn't seem to render 0px dimensions, so now we set the 
									// 1em margin x 2 for the width
									.width( (action.match('px') ? margin + 'px' : (margin * 2) + 'em') )
									.addClass('ui-keyboard-button ui-keyboard-spacer')
									.appendTo(newSet);
							}

							// meta keys
							if (/^meta\d+\:?(\w+)?/.test(action)){
								base.addKey(action, action);
								continue;
							}

							// switch needed for action keys with multiple names/shortcuts or
							// default will catch all others
							switch(action){

								case 'a':
								case 'accept':
									base
										.addKey('accept', action)
										.addClass(o.css.buttonAction);
									break;

								case 'alt':
								case 'altgr':
									base.addKey('alt', 'alt');
									break;

								case 'b':
								case 'bksp':
									base.addKey('bksp', action);
									break;

								case 'c':
								case 'cancel':
									base
										.addKey('cancel', action)
										.addClass(o.css.buttonAction);
									break;

								// toggle combo/diacritic key
								case 'combo':
									base
										.addKey('combo', 'combo')
										.addClass(o.css.buttonAction);
									break;

								// Decimal - unique decimal point (num pad layout)
								case 'dec':
									base.acceptedKeys.push((base.decimal) ? '.' : ',');
									base.addKey('dec', 'dec');
									break;

								case 'e':
								case 'enter':
									base
										.addKey('enter', action)
										.addClass(o.css.buttonAction);
									break;

								case 's':
								case 'shift':
									base.addKey('shift', action);
									break;

								// Change sign (for num pad layout)
								case 'sign':
									base.acceptedKeys.push('-');
									base.addKey('sign', 'sign');
									break;

								case 'space':
									base.acceptedKeys.push(' ');
									base.addKey('space', 'space');
									break;

								case 't':
								case 'tab':
									base.addKey('tab', action);
									break;

								default:
									if ($.keyboard.keyaction.hasOwnProperty(action)){
										// base.acceptedKeys.push(action);
										base.addKey(action, action)[isAction ? 'addClass' : 'removeClass'](o.css.buttonAction);
									}

							}

						} else {

							// regular button (not an action key)
							base.acceptedKeys.push(keys[key].split(':')[0]);
							base.addKey(keys[key], keys[key], true);
						}
					}
					newSet.find('.ui-keyboard-button:last').after('<br class="ui-keyboard-button-endrow">');
				}
			}
		});
	
		if (sets > 1) { base.sets = true; }
		base.hasMappedKeys = !( $.isEmptyObject(base.mappedKeys) ); // $.isEmptyObject() requires jQuery 1.4+
		return container;
	};

	base.destroy = function() {
		$(document).unbind('mousedown.keyboard keyup.keyboard');
		if (base.$keyboard) { base.$keyboard.remove(); }
		var unb = $.trim(o.openOn + ' accepted beforeClose canceled change contextmenu hidden initialized keydown keypress keyup visible').split(' ').join('.keyboard ');
		base.$el
			.removeClass('ui-keyboard-input ui-keyboard-lockedinput ui-keyboard-placeholder ui-keyboard-notallowed ui-keyboard-always-open ' + o.css.input)
			.removeAttr('aria-haspopup')
			.removeAttr('role')
			.unbind( unb + '.keyboard')
			.removeData('keyboard');
	};

		// Run initializer
		base.init();
	}