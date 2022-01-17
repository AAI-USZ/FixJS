function initializeColorPicker (util, dom) {
			var $firstOption = dom['Options‿select‿colors'].find('option:first')
			  , firstColor   = util.getColor($firstOption.val())
			  ;

			$firstOption.prop('selected', true);
		    dom['Options‿input‿color‿colors'].data('picker').fromString(firstColor);
		}