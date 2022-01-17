function()
		{
			console.log('refresh start')
			var _this = this;
			this.target.fadeTo(1000,0.5).spin('small');
			this.fetch({
				success : function()
				{
					console.log('refresh success')
					_this.target.spin(false);
					_this.renderCollection();
				}
			})
		}