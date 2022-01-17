function(layerID){
						var layer = _this.layers.get(layerID);
						console.log('loader layer',layer, layer.displayCitation)
						
						if( layer.displayCitation != false && layer.get('type') != 'Link' )
						{
							var itemType = ( layer.get('attr').archive ) ? layer.get('attr').archive.toLowerCase() : layer.get('type').toLowerCase();
							console.log(itemType)
							_view.$el.find('.progress-types ul').append('<li class="layer-load-icon-'+ layer.id +'"><i class="zitem-'+ itemType +'"></i></li>')
						}
					}