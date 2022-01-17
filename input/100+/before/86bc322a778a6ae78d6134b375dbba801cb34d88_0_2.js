function redTintImage ($image) {
			$.log('Tinting image');

			var $tint = $.make('figure', { 'class': 'tintWrapper' }).css({ height : ($image.quickHeight(0) + 6) + 'px'
			                                                             , width  : ($image.quickWidth(0) + 6) + 'px'
			                                                             });
			$image.wrap($tint)
				  .data('oldtitle', $image.prop('title'))
				  .prop('title', $.l('Remove image'))
				  .addClass('tintImage');
		}