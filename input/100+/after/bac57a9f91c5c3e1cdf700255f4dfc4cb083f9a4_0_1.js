function(model, response)
								{ 
									$(theElement).find('img').attr("src", oldThumbnail).hide().fadeIn('slow');
								
									//Alert user they added an item that's already in the collection
									if (oldCount == response.items[0].child_items_count)
										$(theElement).find('.duplicate-item').show().fadeOut(3000, function() {
										    	$(thisView.el).find('.browser-item-count').text(model.get('child_items_count') + " items");
										  });

									model.set({'child_items_count':response.items[0].child_items_count});
									model.set({'new_items':null});
									//
									zeegaBrowser.app.draggedItem = null;

								}