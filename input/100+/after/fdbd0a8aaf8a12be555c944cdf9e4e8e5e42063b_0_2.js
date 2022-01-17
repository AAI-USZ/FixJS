function(content) {

			// remove border, cellspacing, cellpadding from all tables

			// @todo what about width, height?

			content.find('table').each(function() {

				jQuery(this).removeAttr('border').removeAttr('cellspacing').removeAttr('cellpadding');

			});

			

			// remove unwanted attributes and cleanup single empty p-tags

			content.find('td').each(function() {

				// remove width, height and valign from all table cells

				jQuery(this).removeAttr('width').removeAttr('height').removeAttr('valign');

				

				if ( this.innerHTML.replace(/[\s\xA0]+/g,'') === '<p><br></p>' ) {

					this.innerHTML = '&nbsp;';

				}

				

				if ( jQuery(this).find('p').length === 1) {

					jQuery(this).find('p').contents().unwrap();

				}

			});

			

			// remove unwanted attributes from tr also? (tested with paste from open/libre office)

			// @todo or do this all via sanitize.js 

			content.find('tr').each(function() {

				// remove width, height and valign from all table cells

				jQuery(this).removeAttr('width').removeAttr('height').removeAttr('valign');

			});

			

			// completely colgroup tags

			// @TODO should we remove colgroup? use sanitize for that?

			content.find('colgroup').remove();

		}