function()
		{
			var _this = this;
			
			_.extend( this.events, this.eventTriggers );
			
			this.initListeners();
			
			this.attr = this.model.get('attr')
			
			if(this.attr.dissolve||true) var op=.01;
			else var op = this.model.get('attr').opacity;
			
			$(this.el).css({
				'position' : 'absolute',
				'overflow' : 'hidden',
				
				'width' : _this.model.get('attr').width+'%',
				'opacity' : _this.model.get('attr').opacity,
				
				// if previewing, then set way off stage somewhere
				'top' : (this.model.player) ? '-1000%' : _this.model.get('attr').top +'%',
				'left' : (this.model.player) ? '-1000%' : _this.model.get('attr').left+'%'
				})
				.addClass('layer-'+ this.model.layerType.toLowerCase() )
				.attr('id', 'layer-visual-'+this.model.id);
			$(this.el).addClass(this.layerClassName);
				
			this.init();
		}