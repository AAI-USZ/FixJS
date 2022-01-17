function()
		{
			var _this = this;
			var check = '';
			if(this.model.get('attr')[this.settings.property]) check = 'checked';
			$(this.el).append( _.template( this.getTemplate(), _.extend(this.settings,{check:check}) ) );
			var count = 0;
			this.$el.find('input').change(function(){
				_this.saveValue( $(this).is(':checked') )
			})
			return this;
		}