function()
		{
			this.hide();
			var _this = this;
			_.each( $(this.el).find('.layer-list-checkboxes li.selected'), function(frame){
				var frame = zeega.app.project.frames.get( $(frame).data('id') );
				var framelayers = frame.get('layers');
				framelayers.push(_this.model.id);
				frame.save({ layers : framelayers });
			})
			if( $(this.el).find('#continue-sequence').is(':checked') )
			{
				zeega.app.continueOnAllFrames( this.model.id )
				return false; // prevents activation of continue to next frame which would be redundant
			}
			if( $(this.el).find('#continue-next-frame').is(':checked') ) zeega.app.continueLayerToNextFrame( this.model.id );

			return false;
		}