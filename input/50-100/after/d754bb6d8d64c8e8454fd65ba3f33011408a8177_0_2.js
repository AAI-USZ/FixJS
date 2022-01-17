function( tbPage ) {
			var $el = this.element,
				header = $el.is( ".ui-header" );

			// This behavior only applies to "fixed", not "fullscreen"
			if( this.options.fullscreen ){ return; }

			$(tbPage).css( "padding-" + ( header ? "top" : "bottom" ), $el.outerHeight() );
		}