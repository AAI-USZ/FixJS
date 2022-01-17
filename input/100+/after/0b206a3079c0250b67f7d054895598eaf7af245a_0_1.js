function(options)
		{
			options || (options = {});

			if(options.diff_events)
			{
				var old_models	=	this._models;
			}
			this._models	=	this.master._models.filter(this.filter);
			this.sort({silent: true});
			if(this.limit) this._models.splice(this.limit);
			if(options.diff_events)
			{
				old_models.diff(this._models).each(function(model) {
					this.fire_event('remove', options, model);
				}, this);

				this._models.diff(old_models).each(function(model) {
					this.fire_event('add', options, model);
				}, this);
			}
			this.fire_event('reset', options, {has_reload: true});
		}