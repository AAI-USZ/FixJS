function()
		{
			this.$el.modal('hide');
			this.remove();
			zeega.app.busy = false;
			return false;
		}