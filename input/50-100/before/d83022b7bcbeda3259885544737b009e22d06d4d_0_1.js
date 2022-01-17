function(e) {
		if (e.which == 9 || e.which == 13) {
			// Tab or enter pressed
			e.preventDefault(); // Stay in this field
			var $new = $(this);
			cur_grimaddSlot($new.val());
			
			$new.val(''); // Clear input
		}
	}