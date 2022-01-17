function() {
		// hold public stuff in our singletong
		var api = {};

		/*---------------------------------------------

			PRIVATE STUFF

			---------------------------------------------*/

		// ref to the "system" context
		var frameBuffer = null;

		// hold all the objects
		var gameObjects = [];

		// hold number of object in the array
		var objCount = 0;

		// flag to redraw the sprites
		var initialized = false;

		// to keep track of deferred stuff
		var pendingDefer = null;

		/*---------------------------------------------

			PUBLIC STUFF

			---------------------------------------------*/
		/**
		 * a reference to the game viewport.
		 * @public
		 * @type me.Viewport
		 * @name me.game#viewport
		 */
		api.viewport = null;
		/**
		 * a reference to the game HUD (if defined).
		 * @public
		 * @type me.HUD_Object
		 * @name me.game#HUD
		 */
		api.HUD = null;
		/**
		 * a reference to the game collision Map
		 * @public
		 * @type me.TiledLayer
		 * @name me.game#collisionMap
		 */
		api.collisionMap = null;
		/**
		 * a reference to the game current level
		 * @public
		 * @type me.TMXTileMap
		 * @name me.game#currentLevel
		 */
		api.currentLevel = null;

		// FIX ME : put this somewhere else
		api.NO_OBJECT = 0;

		/**
		 * Default object type constant.<br>
		 * See type property of the returned collision vector.
		 * @constant
		 * @name me.game#ENEMY_OBJECT
		 */
		api.ENEMY_OBJECT = 1;

		/**
		 * Default object type constant.<br>
		 * See type property of the returned collision vector.
		 * @constant
		 * @name me.game#COLLECTABLE_OBJECT
		 */
		api.COLLECTABLE_OBJECT = 2;

		/**
		 * Default object type constant.<br>
		 * See type property of the returned collision vector.
		 * @constant
		 * @name me.game#ACTION_OBJECT
		 */
		api.ACTION_OBJECT = 3; // door, etc...

		/**
		 * Fired when a level is fully loaded and <br>
		 * and all entities instantiated. <br>
		 * Additionnaly the level id will also be passed
		 * to the called function.
		 * @public
		 * @type function
		 * @name me.game#onLevelLoaded
		 * @example
		 * call myFunction() everytime a level is loaded
		 * me.game.onLevelLoaded = this.myFunction.bind(this);
		 */
		 api.onLevelLoaded = null;

		/**
		 * Initialize the game manager
		 * @name me.game#init
		 * @private
		 * @function
		 * @param {int} [width="full size of the created canvas"] width of the canvas
		 * @param {int} [height="full size of the created canvas"] width of the canvas
		 * init function.
		 */
		api.init = function(width, height) {
			if (!initialized) {
				// if no parameter specified use the system size
				var width = width || me.video.getWidth();
				var height = height || me.video.getHeight();

				// create a defaut viewport of the same size
				api.viewport = new me.Viewport(0, 0, width, height);

				// get a ref to the screen buffer
				frameBuffer = me.video.getScreenFrameBuffer();

				initialized = true;
			}
		};

		/**
		 * reset the game Object manager<p>
		 * destroy all current object except the HUD
		 * @see me.game#disableHUD
		 * @name me.game#reset
		 * @public
		 * @function
		 */
		api.reset = function() {

			//cancel any pending task
			if (pendingDefer)
			{
				clearTimeout(pendingDefer);
			}
			pendingDefer = null;

			// initialized the object if not yet done
			if (!initialized)
				api.init();

			// remove all objects
			api.removeAll();

			// reset the viewport to zero ?
			if (api.viewport)
				api.viewport.reset();

			// re-add the HUD if defined
			if (api.HUD != null) {
				api.add(api.HUD);
			}

			// also reset the draw manager
			drawManager.reset();

			// reset the transform matrix to the normal one
			frameBuffer.setTransform(1, 0, 0, 1, 0, 0);

		};

		/**
		 * Load a TMX level
		 * @name me.game#loadTMXLevel
		 * @private
		 * @function
		 */

		api.loadTMXLevel = function(level) {
			// load our map
			api.currentLevel = level;

			// get the collision map
			api.collisionMap = api.currentLevel.getLayerByName("collision");
			if (!api.collisionMap || !api.collisionMap.isCollisionMap) {
				console.error("WARNING : no collision map detected");
			}

			// add all defined layers
			var layers = api.currentLevel.getLayers();
			for ( var i = layers.length; i--;) {
				if (layers[i].visible) {
					// only if visible
					api.add(layers[i]);
				}
			};

			// change the viewport limit
			api.viewport.setBounds(Math.max(api.currentLevel.realwidth, api.viewport.width),
								   Math.max(api.currentLevel.realheight, api.viewport.height));

			// load all game entities
			var objectGroups = api.currentLevel.getObjectGroups();
			for ( var group = 0; group < objectGroups.length; group++) {
				// only add corresponding objects it the group is visible
				if (objectGroups[group].visible) {
					for ( var entity = 0; entity < objectGroups[group].objects.length; entity++) {
						api.addEntity(objectGroups[group].objects[entity], objectGroups[group].z);
					}
				}
			}

			// check if the map has different default (0,0) screen coordinates
			if (api.currentLevel.pos.x != api.currentLevel.pos.y) {
				// translate the display accordingly
				frameBuffer.translate( api.currentLevel.pos.x , api.currentLevel.pos.y );
			}

			// sort all our stuff !!
			api.sort();

			// fire the callback if defined
			if (api.onLevelLoaded) {
				api.onLevelLoaded.apply(api.onLevelLoaded, new Array(level.name))
			}

		};

		/**
		 * Manually add object to the game manager
		 * @name me.game#add
		 * @param {me.ObjectEntity} obj Object to be added
		 * @param {int} [z="obj.z"] z index
		 * @public
		 * @function
		 * @example
		 * // create a new object
		 * var obj = new MyObject(x, y)
		 * // add the object and give the z index of the current object
		 * me.game.add(obj, this.z);
		 * // sort the object list (to ensure the object is properly displayed)
		 * me.game.sort();
		 */
		api.add = function(object, zOrder) {
			object.z = (zOrder) ? zOrder : object.z;

			// add the object in the game obj list
			gameObjects.push(object);

			// cache the number of object
			objCount = gameObjects.length;

		};

		/**
		 * add an entity to the game manager
		 * @name me.game#addEntity
		 * @private
		 * @function
		 */
		api.addEntity = function(entityType, zOrder) {
			var obj = me.entityPool.newInstanceOf(entityType);
			if (obj) {
				api.add(obj, zOrder);
			}
		};

		/**
		 * returns the list of entities with the specified name<br>
		 * as defined in Tiled (Name field of the Object Properties)<br>
		 * note : avoid calling this function every frame since
		 * it parses the whole object list each time
		 * @name me.game#getEntityByName
		 * @public
		 * @function
		 * @param {String} entityName entity name
		 * @return {me.ObjectEntity[]} Array of object entities
		 */
		api.getEntityByName = function(entityName)
		{
			var objList = [];
			entityName = entityName.toLowerCase();
			for (var i = objCount, obj; i--, obj = gameObjects[i];) {
				if(obj.name == entityName) {
					objList.push(obj);
				}
			}
			return objList;
		};

		/**
		 * return the entity corresponding to the specified GUID<br>
		 * note : avoid calling this function every frame since
		 * it parses the whole object list each time
		 * @name me.game#getEntityByGUID
		 * @public
		 * @function
		 * @param {String} GUID entity GUID
		 * @return {me.ObjectEntity} Object Entity (or null if not found)
		 */
		api.getEntityByGUID = function(guid)
		{
			for (var i = objCount, obj; i--, obj = gameObjects[i];) {
				if(obj.isEntity && obj.GUID == guid) {
					return obj;
				}
			}
			return null;
		};

		/**
		 * add a HUD obj to the game manager
		 * @name me.game#addHUD
		 * @public
		 * @function
		 * @param {int} x x position of the HUD
		 * @param {int} y y position of the HUD
		 * @param {int} w width of the HUD
		 * @param {int} h height of the HUD
		 * @param {String} [bg="none"] a CSS string specifying the background color (e.g. "#0000ff" or "rgb(0,0,255)")
		 */
		api.addHUD = function(x, y, w, h, bg) {
			// if no HUD existing
			if (api.HUD == null) {
				// create a new default HUD object
				api.HUD = new me.HUD_Object(x, y, w, h, bg);
				api.add(api.HUD);
			}
		};

		/**
		 * disable the current HUD
		 * @name me.game#disableHUD
		 * @public
		 * @function
		 */
		api.disableHUD = function() {

			// if no HUD existing
			if (api.HUD != null) {
				// remove the HUD object
				api.remove(api.HUD);
				// nullify it
				api.HUD = null;

			}
		};

		/**
		 * update all objects of the game manager
		 * @name me.game#update
		 * @private
		 * @function
		 */
		api.update = function() {

			// previous rect (if any)
			var oldRect = null;
			// loop through our objects
			for ( var i = objCount, obj; i--, obj = gameObjects[i];) {
				// check for previous rect before position change
				oldRect = (me.sys.dirtyRegion && obj.isEntity) ? obj.getRect() : null;

				// update our object
				var updated = obj.update();

				// check if object is visible
				if (obj.isEntity) {
					obj.visible = api.viewport.isVisible(obj.collisionBox);
				}

				// add it to the draw manager
				drawManager.makeDirty(obj, updated, updated ? oldRect : null);
			}
			// update the camera/viewport
			if (api.viewport.update(drawManager.isDirty)) {
				drawManager.makeAllDirty();
			}
		};

		/**
		 * remove an object
		 * @name me.game#remove
		 * @public
		 * @function
		 * @param {me.ObjectEntity} obj Object to be removed
		 */
		api.remove = function(obj) {
			// check if object can be destroy
			if (!obj.destroy || obj.destroy()) {
				// make it invisible (this is bad...)
				obj.visible = false
				// ensure it won't be turn back to visible later
				// PS: may be use obj.alive instead ?
				obj.isEntity = false;

				// remove the object from the object to draw
				drawManager.remove(obj);

				// remove the object from the object list
				/** @private */
				pendingDefer = (function (obj)
				{
				   var idx = gameObjects.indexOf(obj);
				   if (idx!=-1) {
					  gameObjects.splice(idx, 1);
					  // update the number of object
					  objCount = gameObjects.length;
				   }
				   pendingDefer = null;
				}).defer(obj);
			}
      };

		/**
		 * remove all objects
		 * @name me.game#removeAll
		 * @public
		 * @function
		 */
		api.removeAll = function() {
			// inform all object they are about to be deleted
			for (var i = objCount, obj; i--, obj = gameObjects[i];) {
				// force object deletion
				obj.autodestroy = true; // do i keep this feature?
				// notify the object
				if(obj.destroy) {
					obj.destroy();
				}
			}
			//empty everything
			objCount = 0;
			gameObjects.length = 0;
			// make sure it's empty there as well
			drawManager.flush();
		};

		/**
		 * <p>Sort all the game objects.</p>
		 * <p>Normally all objects loaded through the LevelDirector are automatically sorted.
		 * this function is however usefull if you create and add object during the game,
		 * or need a specific sorting algorithm.<p>
		 * @name me.game#sort
		 * @public
		 * @function
		 * @param {Function} [sort_func="sorted on z property value"] sort function
		 * @example
		 * // user defined sort funtion (Z sort based on Y value)
		 * function mySort(a, b) {
		 *    var result = (b.z - a.z);
		 *    return (result ? result : ((b.pos && b.pos.y) - (a.pos && a.pos.y)) || 0);
		 * } </p>
		 * // call me.game.sort with our sorting function
		 * me.game.sort(mySort);
		 */

		api.sort = function(sort_func) {
			if (typeof(sort_func) !== "function") {
				// sort order is inverted,
				// since we use a reverse loop for the display
				gameObjects.sort(function(a, b) {
					return (b.z - a.z);
				});
			}
			else {
				// user defined sort
				gameObjects.sort(sort_func);
			}
			// make sure we redraw everything
			api.repaint();
		};

		/**
		 * check for collision between objects
		 * @name me.game#collide
		 * @public
		 * @function
		 * @param {me.ObjectEntity} obj Object to be tested for collision
		 * @return {me.Vector2d} collision vector {@link me.Rect#collideVsAABB}
		 * @example
		 * // update player movement
		 * this.updateMovement();
		 *
		 * // check for collision with other objects
		 * res = me.game.collide(this);
		 *
		 * // check if we collide with an enemy :
		 * if (res && (res.obj.type == me.game.ENEMY_OBJECT))
		 * {
		 *   if (res.x != 0)
		 *   {
		 *      // x axis
		 *      if (res.x<0)
		 *         console.log("x axis : left side !");
		 *      else
		 *         console.log("x axis : right side !");
		 *   }
		 *   else
		 *   {
		 *      // y axis
		 *      if (res.y<0)
		 *         console.log("y axis : top side !");
		 *      else
		 *         console.log("y axis : bottom side !");
		 *   }
		 * }

		 */
		api.collide = function(objB) {
			var result = null;

			// this should be replace by a list of the 4 adjacent cell around the object requesting collision
			for ( var i = objCount, obj; i--, obj = gameObjects[i];)//for (var i = objlist.length; i-- ;)
			{
				if (obj.visible && obj.collidable && obj.isEntity && (obj!=objB))
				{
					// if return value != null, we have a collision
					if (result = obj.checkCollision(objB))
						// stop the loop return the value
						break;
				}
			}
			return result;

		};

		/**
		 * force the redraw (not update) of all objects
		 * @name me.game#repaint
		 * @public
		 * @function
		 */

		api.repaint = function() {
			drawManager.makeAllDirty();
		};

		/**
		 * draw all existing objects
		 * @name me.game#draw
		 * @private
		 * @function
		 */

		api.draw = function() {
			if (drawManager.isDirty) {
				// draw our objects
				drawManager.draw(frameBuffer);

				// call the viewport draw function (for effects)
				api.viewport.draw(frameBuffer)
			}
			// clean everything for next frame
			drawManager.flush();
		};

		// return our object
		return api;

	}