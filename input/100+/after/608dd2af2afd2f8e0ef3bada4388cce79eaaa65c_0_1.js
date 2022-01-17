function()
		{
			var _this = this;
			console.log('modal render!!!')
			$(this.el).html( this.getTemplate() );
			
			console.log(zeega.app.currentFrame.get('layers'))
			var count = 0;
			_.each( zeega.app.currentFrame.get('layers'), function(layerID){
				var layer = zeega.app.project.layers.get(layerID);
				console.log(layer);
				if(layer.get('type') == 'Link' &&  layer.get('attr').from_frame == zeega.app.currentFrame.id)
				{
					console.log('this frame has links!!')
					var frame = zeega.app.project.frames.get(layer.get('attr').to_frame);
					console.log(frame)
					var optionString = "<li data-id='"+frame.id+"'><a href='#'><img src='"+ frame.get('thumbnail_url')+"' height:'50px' width='50px'/></a></li>";
					$(_this.el).find('.layer-list-checkboxes').append(optionString);
					count++;
				}
			})
			if(count == 0) $(_this.el).find('#linked-frames-selector').remove();

			return this;
		}