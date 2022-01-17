function() {
						dpPrev.unbind('click');
						if(!inMinYear) {
							dpPrev.removeClass('ui-state-disabled').click(function() {_advanceYear_MYP(-1)});
						}
						else {
							dpPrev.addClass('ui-state-disabled');
						}
						dpNext.unbind('click');
						if(!inMaxYear) {
							dpNext.removeClass('ui-state-disabled').click(function() {_advanceYear_MYP(1)});
						}
						else {
							dpNext.addClass('ui-state-disabled');
						}
					}