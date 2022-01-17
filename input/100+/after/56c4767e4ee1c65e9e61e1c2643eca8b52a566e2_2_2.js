function() {

				var $list = jQuery(this);

				$list.contents(':not(li,ul,ol)').each(function() {

					jQuery(this).remove();

				});

			}