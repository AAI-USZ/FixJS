function once( listener, target )

	{

		var that = this;

		function oneTime() {

			that.remove( oneTime );

			listener.apply( this, arguments );

			listener = undefined;

			that = undefined;

		}

		this.add( oneTime, target );

	}