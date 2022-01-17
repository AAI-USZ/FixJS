function($, undefined) {
	"use strict";
	
	/**
	* @version 0.1
	*
	*/
	
	/**
	 * Configuration
	 */
	var defaults = {
		// No options yet
	};
	
	var config = {
		ignoreKeys: [			
			35, // end
			36, // home
			37, // left
			39 // right			
		],
		lookbackKeys: [
			16, // shift
			17, // ctrl
			18 // alt
		],
		noselectionKeys: [
			8, // backspace
			46 // delete
		]
	};
	
	/**
	 * Some variables
	 */
	var _options;
	var _keypressCounter = 0;
	
	// Object of plugin methods	
	var methods = {
		init: function(o) {
			// Not on mobile devices
			if (_isMobile().any) {
				return false;
			}
			
			// Extend options with defaults
			_options = $.extend(defaults, o);
			
			// The Loop
			return this.each(function() {
				var $select = $(this);
				
				// Adds the textbox
				var $input = _inputAfter($select);
				
				// Watch the select for changes and update input right away
				_watchChanges($select, $input);
				
				// Keypress counter and repeater neutralizer
				_initKeypressCounter($input);
				
				// Autocompletes the input when typing
				_autocompleteInput($select, $input);
				
				// Selects all text on focus in input element
				_selectallOnFocus($input);				
			});
		}
	};
	
	/**
	 * Private methods
	 */
	
	// Adds a input element after the textbox and positions it
	function _inputAfter($select) {
		var $input = $('<input/>');
		
		// Default options for input
		$input.css({
			position: 'absolute'
		});
		
		// Position relative to select element
		_positionInput($select, $input);
		
		// Set text value to select value
		$input.val($select.find('option:selected').text());
		
		// Insert into DOM
		$select.after($input);
		
		// Return to callee with the new input element
		return $input;
	}
	
	// Positions the input element
	function _positionInput($select, $input) {
		var offset = _positionCorrection();
		$input.css({
			top		: $select.position().top + offset.top,
			left	: $select.position().left + offset.left,
			width	: $select.width() + offset.width,
			height	: $select.height() + offset.height
		});
	}
	
	// Get position correction for input based on browsers
	// Based on Windows 7 / Mac OS X Lion and latest browser versions
	function _positionCorrection() {
		// jQuery.browser is deprecated, so we may want to rewrite this
		// functionality ourselves, as we can't rely on feature detection here
		var defaultOffset = {
			top		: 0,
			left	: 0,
			width	: -22,
			height	: -4
		};
		var offset = {};
		var browser = _browser();
		var os = _os();
		if (browser.chrome) {
			offset = {
				top		: 2,
				left	: 2,
				width	: -20
			}
		}
		if (browser.safari || (browser.chrome && os.mac)) { // also for chrome on mac
			offset = {
				top		: 2,
				left	: 2,
				width	: 4,
				height	: -2		
			}
			if (os.mac) {
				offset.width = -25;
				offset.height = -6;
			}
		}
		if (browser.msie) {
		}		
		if (browser.mozilla) {
			if (os.mac) {
				offset = {
					height: -6,
					width: 0
				}
			}
		}
		if (browser.opera) {
			offset = {
				top		: 0,
				left	: 0,
				width	: -16,
				height	: 0				
			}
			if (os.mac) {
				offset = {
					top		: 1,
					left	: 2,
					width	: -22,
					height	: -3
				}
			}
		}
		return $.extend(defaultOffset, offset);
	}
	
	// Watch the select box for changes and updated input
	function _watchChanges($select, $input) {
		$select.on('change', function() {
			$input.val($select.find('option:selected').text());
		});
	}
	
	// The beating heart: autocomplete function
	function _autocompleteInput($select, $input) {
		var lastKeycode = null;
		$input.on('keyup', function(e) {			
			// Ignoring subsequent keypresses to prevents quirks
			console.log(_keypressCounter);
			
			// Sore last pressed key for lookback
			if ($.inArray(e.keyCode, config.lookbackKeys) == -1) {
				lastKeycode = e.keyCode;
			}
			
			// Wait for all keys to be released
			if (_keypressCounter > 0) {
				return;
			}
			
			// Ignore the current or lookback key?
			if (
				$.inArray(e.keyCode, config.ignoreKeys) >= 0 ||
				(
					$.inArray(e.keyCode, config.lookbackKeys) >= 0 &&
					$.inArray(lastKeycode, config.ignoreKeys) >= 0
				)
			) {
				return;
			}
			
			// Resets the notfound color
			_resetNotfound($input);
			
			// Gets the current input text
			var typedText = $input.val();
			
			// Find an option containing our text (case-insensitive)
			// TODO: escape text
			var $match = $select.find('option:startswithi(\'' + typedText + '\'):eq(0)');
			var matchedText = $match.text();
			
			// Do we have a match?
			if ($match.length) {
				// Set select box to match
				$select.val($match.val());
				
				// Make selection if not in noselectionKeys list
				if ($.inArray(e.keyCode, config.noselectionKeys) == -1) {
					$input.val(matchedText);
					_createSelection($input, typedText.length, matchedText.length)
				}				
			} else {
				// Set select box to option without value
				// TODO: if no such option exist?
				$select.val('');
				
				// Set notfound color on input
				_markNotfound($input);
			}			
		});
	}
	
	// Keypress counter and repeater neutralizer
	// Used in autocompleter to only continue if 
	// user finished pressing any keys
	function _initKeypressCounter($input) {
		var keysPressed = [];
		$input.on('keydown', function(e) {
			// Store currently pressed keys
			if ($.inArray(e.keyCode, keysPressed) == -1) {
				keysPressed.push(e.keyCode);
			}
			_keypressCounter = keysPressed.length;
		});
		
		$input.on('keyup', function(e) {			
			// Remove currently pressed key from store
			var index = $.inArray(e.keyCode, keysPressed);
			if (index >= 0) {
				keysPressed.splice(index, 1);
			}
			_keypressCounter = keysPressed.length;
		});	
	}
	
	// Resets the notfound color
	function _resetNotfound($input) {
		$input.css({
			color: 'black'
		});
	}
		
	// Marks an input as having no matches in the select
	function _markNotfound($input) {
		$input.css({
			color: 'red'
		});
	}
	
	// @source http://stackoverflow.com/a/646662/938297
	function _createSelection($field, start, end) {
		var field = $field[0];
        if (field.createTextRange) {
            var selRange = field.createTextRange();
            selRange.collapse(true);
            selRange.moveStart('character', start);
            selRange.moveEnd('character', end);
            selRange.select();
        } else if (field.setSelectionRange) {
            field.setSelectionRange(start, end);
        } else if (field.selectionStart) {
            field.selectionStart = start;
            field.selectionEnd = end;
        }
        field.focus();
    }       
	
	// Selects all input gets focus by click only
	// TODO: rewrite for use with tabstop too
	function _selectallOnFocus($input) {
		$input.on('click', function(e) {
			$(this).select();
		});
	}
	
	// @source http://www.abeautifulsite.net/blog/2011/11/detecting-mobile-devices-with-javascript/
	function _isMobile() {
		return {
			android: function() {
				return navigator.userAgent.match(/Android/i) ? true : false;
			}(),
			blackberry: function() {
				return navigator.userAgent.match(/BlackBerry/i) ? true : false;
			}(),
			ios: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
			}(),
			windows: function() {
				return navigator.userAgent.match(/IEMobile/i) ? true : false;
			}(),
			any: function() {
				return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|IEMobile/i) ? true : false;
			}()
		}
	}
		
	function _os() {
		return {
			mac: function() {
				return navigator.userAgent.match(/Mac/i) ? true : false;
			}(),
			windows: function() {
				return navigator.userAgent.match(/Win/i) ? true : false;
			}()
		}		
	}
	
	// @source https://github.com/louisremi/jquery.browser/blob/master/jquery.browser.js
	function _browser() {
		var ua = navigator.userAgent.toLowerCase(),
			match,
			i = 0,
			
			// Useragent RegExp
			rbrowsers = [
				/(chrome)[\/]([\w.]+)/,
				/(safari)[\/]([\w.]+)/,
				/(opera)(?:.*version)?[ \/]([\w.]+)/,
				/(msie) ([\w.]+)/,
				/(mozilla)(?:.*? rv:([\w.]+))?/
			];
			
		var browser = {};
		do {
			if ( (match = rbrowsers[i].exec( ua )) && match[1] ) {
				browser[ match[1] ] = true;
				browser.version = match[2] || "0";
				break;
			}
		} while (i++ < rbrowsers.length)
		
		return browser;
	}
	
	$.fn.jqCombo = function(method) {
    
		// Method calling logic
		if ( methods[method] ) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.jqCombo');
			return false;
		}
  
	};
	
}