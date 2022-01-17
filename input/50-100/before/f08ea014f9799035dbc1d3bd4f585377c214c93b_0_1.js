function(frame,layer)
		{
			console.log('	ADD LAYER TO FRAME')
			if(frame.id != zeega.app.currentFrame)
			{
				if(frame.get('layers')) frame.get('layers').push(layer.id);
				else frame.set('layers',[layer.id]);
				frame.save();
				console.log(frame)
			}
			layer.trigger('update');
			zeega.app.updateLayerOrder( frame );
		}