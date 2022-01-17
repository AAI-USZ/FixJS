function(e){
					
					if(self.lastMoves.length >= 2){
						if(Math.abs(self.lastMoves.pop().pageY - self.lastMoves.pop().pageY) >= 2){
							$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css({
								opacity: 0
							});
						}
					} else {
						$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css({
							opacity: 1
						});
					}
					self.lastMoves = [];
				}