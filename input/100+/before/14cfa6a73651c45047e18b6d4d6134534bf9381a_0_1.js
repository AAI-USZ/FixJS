function (cb) {
				function completeFlip() {
					F5.removeTransitionEndListener(newEl);
					cb();			
				}
				F5.addTransitionEndListener(newEl, completeFlip);
				oldEl.style['-webkit-transform'] = 'rotateY(180deg)';
				newEl.style['-webkit-transform'] = 'rotateY(0deg)';
			}