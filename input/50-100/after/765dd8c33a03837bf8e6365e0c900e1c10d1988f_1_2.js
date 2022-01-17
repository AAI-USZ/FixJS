function() {
			this.dispatcher = new events.Dispatcher();

			this.badSubscriber = {
				boo: function(event) {
					throw new Error("Intentional error, please ignore");
				}
			};

			this.goodSubscriber = {
				called: false,

				yay: function(event) {
					this.called = true;
				}
			};
		}