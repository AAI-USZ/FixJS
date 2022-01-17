function()
		{
			var style = {
				'color' : this.model.get('attr').color,
				'backgroundColor' : 'rgba('+ this.model.get('attr').backgroundColor.toRGB() +','+ (this.attr.backgroundColorOpacity || 1) +')',
				'opacity' : this.model.get('attr').opacity,
				'fontSize' : this.model.get('attr').fontSize +'%',
				'padding' : this.model.get('attr').padding +'%',
				'whiteSpace' : 'nowrap'
			}
			console.log('color: '+ style.backgroundColor)

			$(this.el).html( _.template( this.getTemplate(), this.model.get('attr') ) ).css( style );
			
			this.model.trigger('ready',this.model.id)
			
			return this;
		}