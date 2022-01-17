function()
		{
			if( _.isArray(this.get('attr')) ) this.set({ attr : this.defaultAttr });
		}