function(level) {
			// load our map
			api.currentLevel = level;

			// get the collision map
			api.collisionMap = api.currentLevel.getLayerByName("collision");
			if (!api.collisionMap || !api.collisionMap.isCollisionMap) {
				alert("WARNING : no collision map detected");
			}

			
			if ((api.currentLevel.realwidth < api.viewport.getWidth()) ||
			    (api.currentLevel.realheight < api.viewport.getHeight())) {
				throw "melonJS: map size should be at least equal to the defined display size";
			}
			// change the viewport limit
			api.viewport.setBounds(api.currentLevel.realwidth, api.currentLevel.realheight);
			
			// add all defined layers
			var layers = api.currentLevel.getLayers();
			for ( var i = layers.length; i--;) {
				if (layers[i].visible) {
					// only if visible
					api.add(layers[i]);
				}
			};

			// load all game entities
			var objectGroups = api.currentLevel.getObjectGroups();
			for ( var group = 0; group < objectGroups.length; group++) {
				for ( var entity = 0; entity < objectGroups[group].objects.length; entity++) {
					api.addEntity(objectGroups[group].objects[entity], objectGroups[group].z);
				}
			}

			// sort all our stuff !!
			api.sort();
			
			// fire the callback if defined
			if (api.onLevelLoaded) {
				api.onLevelLoaded.apply(api.onLevelLoaded, new Array(level.name))
			} 

		}