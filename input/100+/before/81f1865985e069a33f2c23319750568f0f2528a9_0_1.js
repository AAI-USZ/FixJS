function(){
	var buttonHandler = {
		tooltips: {
			b : {
				enabled : 'click to make the selected word bold',
				disabled : 'select a word to make bold'
			},
			i : {
				enabled : 'click to make the selected word italic',
				disabled : 'highlight a word to make italic'
			},
			a : {
				enabled : 'click to turn the select word into a link',
				disabled : 'highlight a word to make it a link'
			}
		},
		disableButtons : function(buttons) {
			buttons.removeClass('enabled').addClass('disabled');
			buttons.each(function(idx, button){
				var tag = $(button).attr('data-textstyle');
				$(button).attr('data-title', buttonHandler.tooltips[tag].disabled);
			});
		},
		enableButtons: function(buttons) {
			buttons.removeClass('disabled').addClass('enabled');
			buttons.each(function(idx, button){
				var tag = $(button).attr('data-textstyle');
				$(button).attr('data-title', buttonHandler.tooltips[tag].enabled);
			});
		},
		toggleFullscreen: function() {
				if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
					(!document.mozFullScreen && !document.webkitIsFullScreen)) {               // current working methods
					if (document.documentElement.requestFullScreen) {
						document.documentElement.requestFullScreen();
					} else if (document.documentElement.mozRequestFullScreen) {
						document.documentElement.mozRequestFullScreen();
					} else if (document.documentElement.webkitRequestFullScreen) {
						document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
					}
				} else {
					if (document.cancelFullScreen) {
						document.cancelFullScreen();
					} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
					} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
					}
				}
		},
		removeSpan : function(e){
				e.preventDefault();
				e.stopPropagation();
				$(this).remove();
				$('span').off('click', this.removeSpan);
				$('#reveal section').css({
					'cursor' : 'default'
				});
		},
		round: function(x, step) {
			if(x%step > step/2) {
				x += step - x%step;
				return x;
			} else {
				x -= x%step;
				return x;
			}
		}
	};
	return buttonHandler;
}