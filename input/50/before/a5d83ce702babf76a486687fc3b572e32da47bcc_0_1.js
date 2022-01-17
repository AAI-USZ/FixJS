function()
		{
			console.log('	refresh view')
			this.visual.$el.attr('id','layer-visual-'+this.id)
			if(this.controls) this.controls.$el.attr('id','layer-'+this.id)
		}