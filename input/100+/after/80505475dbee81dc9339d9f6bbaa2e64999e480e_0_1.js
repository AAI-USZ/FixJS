function(){
						if (!startTarget) return;
						if (scrolled){
							clearTimeout(startTimer);
							setTimeout(function(){
								removeClass(startTarget, 'selected');
							}, 2000);
						} else {
							var seasonsDiv = page.seasons;
							addClass(startTarget, 'selected');
							if (w.innerWidth >= 480){
								setTimeout(function(){
									removeClass(startTarget, 'selected');
								}, 350);
							} else {
								setTimeout(function(){
									removeClass(seasonsDiv, 'in');
									addClass(seasonsDiv, 'slideup out reverse');
									setTimeout(function(){
										removeClass(startTarget, 'selected');
									}, 350);
								}, 600);
							}
						}
					}