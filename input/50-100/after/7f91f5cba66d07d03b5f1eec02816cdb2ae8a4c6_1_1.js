function() {
			// Update the configuration object
			$.cookie( 'TimedText.Preferences',  JSON.stringify( this.config ) );
			
			// Empty out previous text to force an interface update:
			this.prevText = [];
			
			// Refresh the Menu (if it has a target to refresh)
			mw.log( 'TimedText:: bind menu refresh display' );			
			this.buildMenu();
			
            this.resizeInterface();
			
            // add an empty catption: 
            this.displayTextTarget( $( '<span /> ').text( '') ); 
            
			// Issues a "monitor" command to update the timed text for the new layout
			this.monitor();
		}