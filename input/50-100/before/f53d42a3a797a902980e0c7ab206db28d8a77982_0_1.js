function()
		{
			this.$el.find('input').unbind('keypress');
			var fieldValue = this.$el.find('input').val();
			if( fieldValue != this.model.get('attr').link )
			{
				this.$el.find('input, .add-on').effect('highlight',{},2000);
				this.model.update({ link : fieldValue })
			}
		}