function() {

				// remove width, height and valign from all table cells

				jQuery(this).removeAttr('width').removeAttr('height').removeAttr('valign');

				

				if ( this.innerHTML.replace(/[\s\xA0]+/g,'') === '<p><br></p>' ) {

					this.innerHTML = '&nbsp;';

				}

				

				if ( jQuery(this).find('p').length === 1) {

					jQuery(this).find('p').contents().unwrap();

				}

			}