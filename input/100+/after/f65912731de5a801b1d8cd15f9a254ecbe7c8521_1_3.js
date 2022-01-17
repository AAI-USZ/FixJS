function() {

					if (!$(this).val() && mandatory_filled == true) {

						mandatory_filled = false;

						return false;

					}

				}