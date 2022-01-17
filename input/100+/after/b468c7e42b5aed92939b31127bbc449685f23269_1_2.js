function()
		{
			var style = {
				'color' : 'rgba('+ this.model.get('attr').color.toRGB() +','+ (this.model.get('attr').colorOpacity || 1) +')',
				'backgroundColor' : 'rgba('+ this.model.get('attr').backgroundColor.toRGB() +','+ (this.model.get('attr').backgroundColorOpacity || 0) +')',
				'opacity' : this.model.get('attr').opacity,
				'fontSize' : this.model.get('attr').fontSize +'%',
				'padding' : this.model.get('attr').padding +'%',
				'whiteSpace' : 'nowrap'
			}
			console.log(this.model.get('attr'))
			console.log('color: '+ style.backgroundColor)
			console.log(this.model)

			$(this.el).html( _.template( this.getTemplate(), this.model.get('attr') ) ).css( style );
			
			this.model.trigger('ready',this.model.id)
			
			return this;
		}