function() {
		// hold public stuff in our singletong
		var obj = {};

		/*---------------------------------------------
			
			PRIVATE STUFF
				
		---------------------------------------------*/
		var entityClass = {};

		/*---------------------------------------------
			
			PUBLIC STUFF
				
		---------------------------------------------*/

		/*---
		
			init
			
			---*/

		obj.init = function() {
			// add default entity object 
			obj.add("me.LevelEntity", me.LevelEntity);
			obj.add("me.ObjectEntity", me.ObjectEntity);
			obj.add("me.CollectableEntity", me.CollectableEntity);
			obj.add("me.InvisibleEntity", me.InvisibleEntity);
		};

		/**
		 * add an object to the pool
		 * @name me.entityPool#add
		 * @public
		 * @function
		 * @param {String} className as defined in the Name fied of the Object Properties (in Tiled)
		 * @param {Object} object corresponding Object to be instanciated
		 * @example
		 * // add our users defined entities in the entity pool
		 * me.entityPool.add("playerspawnpoint", PlayerEntity);
		 * me.entityPool.add("cherryentity", CherryEntity);
		 * me.entityPool.add("heartentity", HeartEntity);
		 * me.entityPool.add("starentity", StarEntity);
		 */
		obj.add = function(className, entityObj) {
			entityClass[className.toLowerCase()] = entityObj;
		};

		/**
		 *	return a new instance of the requested object
		 * @private	
		 */

		obj.newIstanceOf = function(prop) {
			var name = prop.name ? prop.name.toLowerCase() : undefined;
			if (!name) {
				return null;
			}

			if (!entityClass[name]) {
				console.error("cannot instance entity of type '" + name
						+ "': Class not found!");
				return null;
			}
			// i should pass the entity ownProperty instead of the object itself
			return new entityClass[name](prop.x, prop.y, prop);
		};

		// return our object
		return obj;

	}