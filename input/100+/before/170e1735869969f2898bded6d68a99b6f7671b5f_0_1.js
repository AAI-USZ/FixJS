function() {
			waitMsg.fadeIn( 200 );
			// do the actual API request and trigger jQuery.Deferred stuff:
			this.queryApi( deferred, apiAction );
		}