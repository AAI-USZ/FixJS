function (container, oldEl, newEl) {
			
			newEl.parentElement.appendChild(newEl);
			newEl.style.visibility = '';
			
			container.style['-webkit-perspective'] = 1000;
			
			oldEl.style['-webkit-backface-visibility'] = 'hidden';
			oldEl.style['-webkit-transition'] = 'all .5s ease-in-out';

			newEl.style['-webkit-backface-visibility'] = 'hidden';
			newEl.style['-webkit-transition'] = 'all .5s ease-in-out';	
			
			newEl.style['-webkit-transform'] = 'rotateY(-180deg)';
			oldEl.style['-webkit-transform'] = 'rotateY(0deg)';					
						
			return function (cb) {
				function completeFlip() {
					F5.removeTransitionEndListener(newEl);
					cb();			
				}
				F5.addTransitionEndListener(newEl, completeFlip);
				oldEl.style['-webkit-transform'] = 'rotateY(180deg)';
				newEl.style['-webkit-transform'] = 'rotateY(0deg)';
			};
		}