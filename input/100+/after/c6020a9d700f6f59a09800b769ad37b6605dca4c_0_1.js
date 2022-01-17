function() {
			var connected_state = this.model.get('connected_state');
			console.log('render: ' + connected_state);
			var prev = this.$el.text();
			this.$el.empty();
			assert(connected_state === 'connecting' || connected_state === 'disconnected' || connected_state === 'connected');

			if(connected_state === 'connected') {
				this.$el.text(this.count)
					.addClass('badge-success')
					.attr('title', 'Sharing ' + this.count + ' files');
			} else if(connected_state === 'connecting') {
				this.$el.text(getSpinner(prev))
					.removeClass('badge-success')
					.attr('title', 'Connecting...');
				setTimeout(_.bind(function() {
					this.render();
				}, this), 250);
			} else if(connected_state === 'disconnected') {
				this.$el.text('-')
					.removeClass('badge-success')
					.attr('title', 'Failed to connect...');
			}
			return this;
		}