function() {
			var connected_state = this.model.get('connected_state');
			console.log('render: ' + connected_state);
			this.$el.empty();
			assert(connected_state === 'connecting' || connected_state === 'disconnected' || connected_state === 'connected');

			if(connected_state === 'connected') {
				this.$el.text(this.count);
				this.$el.addClass('badge-success');
				this.$el.removeClass('badge-info');
			} else if(connected_state === 'connecting') {
				this.$el.text('-');
				this.$el.removeClass('badge-success');
				this.$el.addClass('badge-info');
			} else if(connected_state === 'disconnected') {
				this.$el.text('-');
				this.$el.removeClass('badge-success');
				this.$el.removeClass('badge-info');
			}
			return this;
		}