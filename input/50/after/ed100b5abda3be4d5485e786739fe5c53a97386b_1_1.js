function()
		{
			this.$el.modal('hide');
			zeega.app.busy = false;
			this.remove();
			return false;
		}