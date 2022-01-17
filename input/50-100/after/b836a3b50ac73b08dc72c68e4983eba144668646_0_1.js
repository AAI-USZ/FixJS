function () {
			// Set to absolute positioning and parent to relative
			this.element.css( 'position', 'absolute');

			//Set the size function to call from jQuery
            this.func = this.options.orientation === 'vertical' ? ['height', 'outerHeight'] : ['width', 'outerWidth'];
            this.dim = this.options.orientation === 'vertical' ? 'top' : 'left';

			// Bind events
			this.bindEvents();

			// Check for a direction lock
			this.lock( this.options.lock );
		}