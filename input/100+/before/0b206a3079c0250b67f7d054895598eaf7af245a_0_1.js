function(options)
		{
			options || (options = {});

			this._models	=	this.master._models.filter(this.filter);
			this.sort({silent: true});
			if(this.limit) this._models.splice(this.limit);
			this.fire_event('reset', options, {has_reload: true});
		}