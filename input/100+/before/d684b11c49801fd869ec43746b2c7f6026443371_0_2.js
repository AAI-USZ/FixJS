function(){
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

	}