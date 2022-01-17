function _expandOnFocus($select, $input, size) {
		// Set styles for $select at focus, update on window resize
		var focusCss;
		$(window).resize(function() {
			focusCss = {
				position: 'absolute',
				left	: $select.position().left,
				top		: $select.position().top + $select.height() + 5,
				zIndex	: 1
			};
		}).resize();		
		
		// Save original settings to restore with blur
		var origSize = $select.attr('size') || 0;
		var origCss = _origCss($select, focusCss);
		
		// Create clone of select element to retain flow on absolute positioning
		var $clone = $select.clone();
		
		// Remove name/id attributes on clone to prevent issues with form submission, labels, etc
		$clone.removeAttr('id name');
		
		// Hide clone from flow for now
		$clone.css({ visibility: 'hidden' }).hide();
		
		// Add clone class so we can target it in _cleanup()
		$clone.removeClass('jqcombo').addClass('jqcombo-clone');
		
		// Add to DOM
		$select.after($clone);
		
		// Expand
		$input.on('focus.jqcombo', function() {
			// Asynchronous to allow collapse invoked by $select.blur to run first
			setTimeout(function() {
				$select.attr('size', size);
				$select.css(focusCss);
				$input.css('z-index', 2);
				$clone.css({ display: 'inline-block' });
			}, 0);
		});
		
		// Cancel collapse invoked by $input.blur
		$select.on('focus.jqcombo', function() {
			if (blurTimer) {
				clearTimeout(blurTimer);
			}
		});
		
		// Timer to allow focus event on select to cancel collapse
		var blurTimer;
		
		// Collapse
		var collapse = function(e) {
			// Asynchronous to allow focus event $select to cancel collapse
			blurTimer = setTimeout(function() {
				$select.attr('size', origSize);
				$select.css(origCss);
				$input.css('z-index', 'auto');
				$clone.hide();
				blurTimer = null;
			}, 0);
		}
		
		// Focus away from $input
		$input.on('blur.jqcombo', collapse);
		
		// Focus away from (expanded) $select
		$select.on('blur.jqcombo click.jqcombo', collapse);
	}