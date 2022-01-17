function()
		{
			var str = this.model.visual.$el.find('#zedit-target').html();
			this.model.update({ content : str });
		}