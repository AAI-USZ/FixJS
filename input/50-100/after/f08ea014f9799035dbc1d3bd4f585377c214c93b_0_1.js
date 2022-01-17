function(frame,layer)
		{
			var layerArray = [];
			if(frame.get('layers'))
			{
				layerArray = frame.get('layers');
				layerArray.push(layer.id);
			}
			else layerArray = [layer.id];
			frame.save({'layers': _.compact(layerArray)});
			layer.trigger('update');
			zeega.app.updateLayerOrder( frame );
		}