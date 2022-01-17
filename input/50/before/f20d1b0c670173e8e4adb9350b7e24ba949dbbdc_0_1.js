function() {
					var li_width = trueInnerWidth( $(this) );
					$(this).css({ 'width' : (li_width + li_padding) });
				}