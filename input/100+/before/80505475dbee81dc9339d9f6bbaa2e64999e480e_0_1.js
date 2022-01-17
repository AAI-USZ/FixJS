function(){
								removeClass(seasonsDiv, 'in');
								addClass(seasonsDiv, 'slideup out reverse');
								setTimeout(function(){
									removeClass(startTarget, 'selected');
								}, 350);
							}