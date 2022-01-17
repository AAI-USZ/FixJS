function() {
				var thisMediaType = this.id ;
										
				var current = $('.media-preview', tooltip) ;
					
				var currentId = current.attr('id') ;
					
				if ( currentId != thisMediaType )
				{
					current.remove() ;
					that.renderContents(tooltip, thumb, thisMediaType) ;
					$(this).toggleClass('selected') ;
				//	$('a#' + currentId, tooltip).toggleClass('selected') ;
				}
				
			}