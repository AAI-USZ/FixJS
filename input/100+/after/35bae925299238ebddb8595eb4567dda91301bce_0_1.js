function(e) {
			// Sore last pressed key for lookback
			if ($.inArray(e.keyCode, keys.lookback) == -1) {
				lastKeycode = e.keyCode;
			}
			
			// Select all on tab
			if (e.keyCode === 9 ||
				($.inArray(e.keyCode, keys.lookback) >= 0 && lastKeycode === 9)) {
				$input.select();
				return;
			}
			
			// Arrow navigation
			if ($.inArray(e.keyCode, keys.down) >= 0) {
				var o = $select.find('option:selected').next();	
				$select.val(o.val());
				$input.val(o.text()).select();
				return;
			} else if ($.inArray(e.keyCode, keys.up) >= 0) {
				var o = $select.find('option:selected').prev();	
				$select.val(o.val());
				$input.val(o.text()).select();
				return;
			}
			
			// Wait for all keys to be released
			if (keypressCounter > 0) {
				return;
			}
			
			// Ignore the current or lookback key?
			if ($.inArray(e.keyCode, keys.ignore) >= 0 ||
				($.inArray(e.keyCode, keys.lookback) >= 0 && $.inArray(lastKeycode, keys.ignore) >= 0)) {
				return;
			}
			
			// Resets the notfound color
			$input.css(origInputCss);
			
			// Gets the current input text
			var typedText = $input.val();
			
			// Find an option containing our text (case-insensitive)
			var $match = $select.find('option:startswithi("' + typedText + '"):eq(0)');
			var matchedText = $match.text();
			
			// Do we have a match?
			if ($match.length) {
				// Set select box to match
				$select.val($match.val());
				
				// Make selection if not in noselectionKeys list
				if ($.inArray(e.keyCode, keys.noselection) == -1) {
					$input.val(matchedText);
					_createSelection($input, typedText.length, matchedText.length)
				}				
			} else {
				// Set select box to option without value
				// TODO: if no such option exist?
				$select.val('');
				
				// Set notfound color on input
				$input.css(notfoundCss);
			}			
		}