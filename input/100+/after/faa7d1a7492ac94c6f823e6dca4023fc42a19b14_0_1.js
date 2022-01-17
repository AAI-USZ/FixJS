function(e){
				
				var $handle = $(this);

				//make sure we are working with a th instead of a handle
				if( $handle.hasClass( o.handle ) ){
					
					$handle = $handle.closest('th');
					//change the target to the th, so the hander can pick up the offsetleft
					e.currentTarget = $handle.closest('th')[0]
				}
				
				
			self.getCol( $handle.index() )
					.attr( 'tabindex', -1 )
	                .focus()
					.disableSelection()
					.css({
	                    top: self.currentColumnCollectionOffset.top,
	                   //using the parentOff.set makes e.pageX reletive to the parent element. This fixes the issue of the drag display not showing up under cursor on drag.
	                    left: self.currentColumnCollectionOffset.left
					})
	                .appendTo( document.body )
				

				
				self._mousemoveHandler( e );
				//############
			}