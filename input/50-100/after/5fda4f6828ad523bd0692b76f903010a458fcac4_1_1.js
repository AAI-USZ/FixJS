function() {
				// 1.9 BC for #7810
				// TODO remove fallback to name
				var instance = $.data( this, fullName ) || $.data( this, name );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					new object( options, this );
				}
			}