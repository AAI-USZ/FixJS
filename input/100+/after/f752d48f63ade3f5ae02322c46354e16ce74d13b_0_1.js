function(x, y, settings) {
					this.parent(x, y, 
								(typeof settings.image == "string") ? me.loader.getImage(settings.image) : settings.image, 
								settings.spritewidth, 
								settings.spriteheight);
					
					// check for user defined transparent color
					if (settings.transparent_color) {
						this.setTransparency(settings.transparent_color);
					}
					
					// set the object GUID value
					this.GUID = me.utils.createGUID();
					
					// set the object entity name
					this.name = settings.name?settings.name.toLowerCase():"";
					
					// adjust initial coordinates (should be bottom left ones when in a tiled world)
					// TODO: better and take in account isometric map and corresponding position
					this.pos.set(x, me.game.currentLevel?y + (settings.height||0) - this.height:y);

					/**
					 * entity current velocity<br>
					 * @public
					 * @type me.Vector2d
					 * @name me.ObjectEntity#vel
					 */
					this.vel = new me.Vector2d();

					/**
					 * entity current acceleration<br>
					 * @public
					 * @type me.Vector2d
					 * @name me.ObjectEntity#accel
					 */
					this.accel = new me.Vector2d();
					
					/**
					 * entity current friction<br>
					 * @public
					 * @type me.Vector2d
					 * @name me.ObjectEntity#friction
					 */
					this.friction = new me.Vector2d();
					
					/**
					 * max velocity (to limit entity velocity)<br>
					 * @public
					 * @type me.Vector2d
					 * @name me.ObjectEntity#maxVel
					 */
					this.maxVel = new me.Vector2d(1000,1000);

					// some default contants
					/**
					 * Default gravity value of the entity<br>
					 * default value : 0.98 (earth gravity)<br>
					 * to be set to 0 for RPG, shooter, etc...
					 * @public
					 * @type Number
					 * @name me.ObjectEntity#gravity
					 */
					this.gravity = (me.sys.gravity!=undefined)?me.sys.gravity:0.98;

					// just to identify our object
					this.isEntity = true;

					// dead state :)
					/**
					 * dead/living state of the entity<br>
					 * default value : true
					 * @public
					 * @type Boolean
					 * @name me.ObjectEntity#alive
					 */
					this.alive = true;

					// some usefull variable
					
					/**
					 * falling state of the object<br>
					 * true if the object is falling<br>
					 * false if the object is standing on something<br>
					 * (!) READ ONLY property
					 * @public
					 * @type Boolean
					 * @name me.ObjectEntity#falling
					 */
					this.falling = false;
					/**
					 * jumping state of the object<br>
					 * equal true if the entity is jumping<br>
					 * (!) READ ONLY property
					 * @public
					 * @type Boolean
					 * @name me.ObjectEntity#jumping
					 */
					this.jumping = true;

					// some usefull slope variable
					this.slopeY = 0;
					/**
					 * equal true if the entity is standing on a slope<br>
					 * (!) READ ONLY property
					 * @public
					 * @type Boolean
					 * @name me.ObjectEntity#onslope
					 */
					this.onslope = false;
					/**
					 * equal true if the entity is on a ladder<br>
					 * (!) READ ONLY property
					 * @public
					 * @type Boolean
					 * @name me.ObjectEntity#onladder
					 */
					this.onladder = false;

					// to enable collision detection
					this.collidable = settings.collidable || false;
					//this.collectable = false;

					this.type = settings.type || 0;

					
					// ref to the collision map
					this.collisionMap = me.game.collisionMap;
					
					// to know if our object can break tiles
					/**
					 * Define if an entity can go through breakable tiles<br>
					 * default value : false<br>
					 * @public
					 * @type Boolean
					 * @name me.ObjectEntity#canBreakTile
					 */
					this.canBreakTile = false;
					
					/**
					 * a callback when an entity break a tile<br>
					 * @public
					 * @type Function
					 * @name me.ObjectEntity#onTileBreak
					 */
					this.onTileBreak = null;
				}