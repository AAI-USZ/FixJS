function() {

					var $li = jQuery(this);

					$li.contents().each(function() {

						if (this.nodeType === 3) {

							this.data = jQuery.trim(this.data);

						}

					});

				}