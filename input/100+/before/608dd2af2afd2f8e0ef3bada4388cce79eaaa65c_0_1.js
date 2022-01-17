function()
		{
			var _this = this;
			console.log('modal render!!!########git ')
			$(this.el).html( this.getTemplate() );
			
			if(zeega.app.currentFrame.get('layers').length < 1 ) $(_this.el).find('.layer-checkbox-list').append('there are no layers on this frame to continue. Press the "Make New Sequence" button to continue with a blank sequence.')
			_.each( zeega.app.currentFrame.get('layers'), function(layerID){
				var layer = zeega.app.project.layers.get(layerID);
				if(layer.get('type') != 'Link')
				{
					var optionString = "<li><label class='checkbox'><input type='checkbox' value='"+ layer.id +"'> <i class='zicon-"+ layer.get('type').toLowerCase() +"'></i> "+layer.get('attr').title +"</label></li>";
					$(_this.el).find('.layer-checkbox-list').append(optionString)
				}
			})

			return this;
		}