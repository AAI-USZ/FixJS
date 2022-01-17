function( layer )
	{
		layer.trigger('loading', layer.id)
		this.$el.find('#preview-media').append( layer.visual.render().el );
		layer.trigger('player_preload');
	}