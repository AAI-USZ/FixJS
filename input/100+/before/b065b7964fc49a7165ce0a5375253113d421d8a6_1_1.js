function()
		{
			$(this.el).find('.default-layer-controls').empty();

			var persistentLayers = ( zeega.app.currentSequence.get('attr') ) ? zeega.app.currentSequence.get('attr').persistLayers : {};
			var isActive = _.include(persistentLayers, parseInt(this.model.id) );
			
			var continueLayer = new Layer.Views.Lib.ContinueLayer({ model: this.model });

			var dissolveCheck = new Layer.Views.Lib.Checkbox({
				property : 'dissolve',
				model: this.model,
				label : 'Dissolve'
			});

/*
			var continueToNext = new Layer.Views.Lib.ContinueToNextFrame({ model: this.model });
			var continueOnAll = new Layer.Views.Lib.ContinueOnAllFrames({ model: this.model, active : isActive });
*/
			
			$(this.el).find('.default-layer-controls')
				.append( dissolveCheck.getControl() )
				.append( continueLayer.getControl() );
				//.append( continueToNext.getControl() );
			if( this.model.get('attr').linkable )
			{
				var link = new Layer.Views.Lib.Link({ model: this.model });
				$(this.el).find('.default-layer-controls').append( link.getControl() );
			}
		}