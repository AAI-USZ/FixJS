function() {
					alert('form completely loaded');
	  				// do your calculations here
					$(drug.eligible).on('select', function() {
						$(drug.available).removeAttr('disabled');
					});
					$(drug.available).on('select', function() {
						$(drug.notAvailable.join(',')).removeAttr('disabled');
					});
				}