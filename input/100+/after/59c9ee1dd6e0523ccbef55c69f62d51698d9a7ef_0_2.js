function(options){
	  return this.each(function(){
      
	    var $self = $( this ),
	        att = "data-set",
	        $set = $( "["+ att +"='"+ $self.closest( "["+ att +"]" ).attr( att ) + "']" ),
	        $timer = null;
      
	    function appendToVisibleContainer(){
	      if( $self.is( ":hidden" ) ){
	        $self.appendTo( $set.filter( ":visible:eq(0)" ) );
	      }
	    }
	    
            // As resize is called constantly, it is likely a good idea to add a bit
            // of a buffer. Paul Irish does a good job summarizing the issue:
            // http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
            function bufferResize() {
                if ($timer != null)
                    clearTimeout($timer);
                $timer = setTimeout(appendToVisibleContainer, 100)
            }

            appendToVisibleContainer();
      
	    $(window).resize( (options && options.buffer == true) ? bufferResize : appendToVisibleContainer );
      
	  });
	}