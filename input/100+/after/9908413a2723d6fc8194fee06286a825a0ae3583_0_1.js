function(self){
			if($( '> '+ self.options.divs.content, self).outerHeight() < self.currentScrollHeight){
				var scrollPercent = $( '> '+self.options.divs.content, self).outerHeight() /  self.currentScrollHeight;
				var scrollbarHeight = Math.round( $('> ' + self.options.divs.content , self).height()  * scrollPercent) ;
				$('> .' + self.options.divs.scroll_bar,self).show().find('> .' + self.options.divs.scroll_grab).height( scrollbarHeight + 'px');

				self.lastMoves = [];
				$('> ' + self.options.divs.content, self).bind("touchmove", function(e){
					self.lastMoves.push( e.originalEvent);
				

				});
				
				$('> ' + self.options.divs.content, self).bind("touchend", function(e){
					
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
				});

				if($.fn.drag){
					$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab, self).unbind('drag').drag(function( ev, dd ){
						$('> ' + self.options.divs.content , self).scrollTop((dd.offsetY-dd.originalY)/scrollPercent);
					});
				}

				$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css('top', Math.round( $(self.options.divs.content, self).scrollTop() * scrollPercent)+'px');
				$('> ' + self.options.divs.content, self).unbind('scroll').scroll(
					function(){
						$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css({
							opacity: 1
						});
						$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css('top', Math.round( $(this).scrollTop() * scrollPercent)+'px');
					});
			} else {
				$('> .' + self.options.divs.scroll_bar, self).hide();
			}
		}