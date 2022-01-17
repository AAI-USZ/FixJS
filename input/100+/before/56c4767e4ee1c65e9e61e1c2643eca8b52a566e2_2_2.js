function() {

				var $list = jQuery(this);

				$list.contents(':not(li,ul,ol)').each(function() {

					jQuery(this).remove();

				});

				// for all li's, trim the text contents

				$list.children('li').each(function() {

					var $li = jQuery(this);

					$li.contents().each(function() {

						if (this.nodeType === 3) {

							this.data = jQuery.trim(this.data);

						}

					});

				});

			}