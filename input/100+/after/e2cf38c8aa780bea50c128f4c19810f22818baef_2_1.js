function( num )
	{
		if( !this.busy )
		{
			var _this = this
			var n = num || 1;
			var Frame = zeega.module('frame');
		
			for( var i = 0 ; i < n ; i++ )
			{
				var layers = _.compact( this.currentSequence.get('attr').persistLayers ) || [];
				console.log('new frame!!! with persistent layers:', this.currentSequence, layers)
			
				var newFrame = new Frame.Model();
				newFrame.set({'layers' : layers},{'silent':true});
				console.log(newFrame)
			
				newFrame.save({},{
					success : function()
					{
						console.log(newFrame)
						newFrame.render();
					
						newFrame.trigger('refresh_view');
						//_this.currentSequence.trigger('updateFrameOrder');
						newFrame.trigger('updateThumb');
						_this.project.frames.add( newFrame );
						_this.loadFrame( newFrame );
						
						_this.currentSequence.get('frames').push(newFrame.id);
						
					}
				});
			
			}
		}
	}