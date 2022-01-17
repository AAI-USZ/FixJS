function () {
	/** array of dirty rects on screen */
	var dirty_rects = [], dirty_viewport = false,
	/** array of DOMs needed updating */
		dom = [];

	return {
		/**@
		* #Crafty.DrawManager.total2D
		* @comp Crafty.DrawManager
		* 
		* Total number of the entities that have the `2D` component.
		*/
		total2D: Crafty("2D").length,

		/**@
		* #Crafty.DrawManager.onScreen
		* @comp Crafty.DrawManager
		* @sign public Crafty.DrawManager.onScreen(Object rect)
		* @param rect - A rectangle with field {_x: x_val, _y: y_val, _w: w_val, _h: h_val}
		* 
		* Test if a rectangle is completely in viewport
		*/
		onScreen: function (rect) {
			return Crafty.viewport._x + rect._x + rect._w > 0 && Crafty.viewport._y + rect._y + rect._h > 0 &&
				   Crafty.viewport._x + rect._x < Crafty.viewport.width && Crafty.viewport._y + rect._y < Crafty.viewport.height;
		},

		/**@
		* #Crafty.DrawManager.merge
		* @comp Crafty.DrawManager
		* @sign public Object Crafty.DrawManager.merge(Object set)
		* @param set - an array of rectangular regions
		* 
		* Merged into non overlapping rectangular region
		* Its an optimization for the redraw regions.
		*/
		merge: function (set) {
			do {
				var newset = [], didMerge = false, i = 0,
					l = set.length, current, next, merger;

				while (i < l) {
					current = set[i];
					next = set[i + 1];

					if (i < l - 1 && current._x < next._x + next._w && current._x + current._w > next._x &&
									current._y < next._y + next._h && current._h + current._y > next._y) {

						merger = {
							_x: ~~Math.min(current._x, next._x),
							_y: ~~Math.min(current._y, next._y),
							_w: Math.max(current._x, next._x) + Math.max(current._w, next._w),
							_h: Math.max(current._y, next._y) + Math.max(current._h, next._h)
						};
						merger._w = merger._w - merger._x;
						merger._h = merger._h - merger._y;
						merger._w = (merger._w == ~~merger._w) ? merger._w : merger._w + 1 | 0;
						merger._h = (merger._h == ~~merger._h) ? merger._h : merger._h + 1 | 0;

						newset.push(merger);

						i++;
						didMerge = true;
					} else newset.push(current);
					i++;
				}

				set = newset.length ? Crafty.clone(newset) : set;

				if (didMerge) i = 0;
			} while (didMerge);

			return set;
		},

		/**@
		* #Crafty.DrawManager.add
		* @comp Crafty.DrawManager
		* @sign public Crafty.DrawManager.add(old, current)
		* @param old - Undocumented
		* @param current - Undocumented
		* 
		* Calculate the bounding rect of dirty data and add to the register of dirty rectangles
		*/
		add: function add(old, current) {
			if (!current) {
				dom.push(old);
				return;
			}

			var rect,
				before = old._mbr || old,
				after = current._mbr || current;

			if (old === current) {
				rect = old.mbr() || old.pos();
			} else {
				rect = {
					_x: ~~Math.min(before._x, after._x),
					_y: ~~Math.min(before._y, after._y),
					_w: Math.max(before._w, after._w) + Math.max(before._x, after._x),
					_h: Math.max(before._h, after._h) + Math.max(before._y, after._y)
				};

				rect._w = (rect._w - rect._x);
				rect._h = (rect._h - rect._y);
			}

			if (rect._w === 0 || rect._h === 0 || !this.onScreen(rect)) {
				return false;
			}

			//floor/ceil
			rect._x = ~~rect._x;
			rect._y = ~~rect._y;
			rect._w = (rect._w === ~~rect._w) ? rect._w : rect._w + 1 | 0;
			rect._h = (rect._h === ~~rect._h) ? rect._h : rect._h + 1 | 0;

			//add to dirty_rects, check for merging
			dirty_rects.push(rect);

			//if it got merged
			return true;
		},

		/**@
		* #Crafty.DrawManager.debug
		* @comp Crafty.DrawManager
		* @sign public Crafty.DrawManager.debug()
		*/
		debug: function () {
			console.log(dirty_rects, dom);
		},

		// jc - added viewportChanged() to simply set a flag, and perform drawAll() later
		// this way make sure we only do draw all once each frame, avoid adding more dirty rect
		// between viewport change and DrawManager.draw(), causing another major re-rendering
		viewportChanged : function()
		{
			dirty_viewport = true;
		},

		/**@
		* #Crafty.DrawManager.draw
		* @comp Crafty.DrawManager
		* @sign public Crafty.DrawManager.draw([Object rect])
        * @param rect - a rectangular region {_x: x_val, _y: y_val, _w: w_val, _h: h_val}
        * ~~~
		* - If rect is omitted, redraw within the viewport
		* - If rect is provided, redraw within the rect
		* ~~~
		*/
		drawAll: function (rect) {
			var rect = rect || Crafty.viewport.rect(),
				q = Crafty.map.search(rect),
				i = 0,
				l = q.length,
				ctx = Crafty.canvas.context,
				current;

			ctx.clearRect(rect._x, rect._y, rect._w, rect._h);

			//sort the objects by the global Z
			q.sort(function (a, b) { return a._globalZ - b._globalZ; });
			for (; i < l; i++) {
				current = q[i];
				if (current._visible && current.__c.Canvas) {
					current.draw();
					current._changed = false;
				}
			}
		},

		/**@
		* #Crafty.DrawManager.boundingRect
		* @comp Crafty.DrawManager
		* @sign public Crafty.DrawManager.boundingRect(set)
		* @param set - Undocumented
		* ~~~
		* - Calculate the common bounding rect of multiple canvas entities.
		* - Returns coords
		* ~~~
		*/
		boundingRect: function (set) {
			if (!set || !set.length) return;
			var newset = [], i = 1,
			l = set.length, current, master = set[0], tmp;
			master = [master._x, master._y, master._x + master._w, master._y + master._h];
			while (i < l) {
				current = set[i];
				tmp = [current._x, current._y, current._x + current._w, current._y + current._h];
				if (tmp[0] < master[0]) master[0] = tmp[0];
				if (tmp[1] < master[1]) master[1] = tmp[1];
				if (tmp[2] > master[2]) master[2] = tmp[2];
				if (tmp[3] > master[3]) master[3] = tmp[3];
				i++;
			}
			tmp = master;
			master = { _x: tmp[0], _y: tmp[1], _w: tmp[2] - tmp[0], _h: tmp[3] - tmp[1] };

			return master;
		},

		/**@
		* #Crafty.DrawManager.draw
		* @comp Crafty.DrawManager
		* @sign public Crafty.DrawManager.draw()
		* ~~~
		* - If the number of rects is over 60% of the total number of objects
		*	do the naive method redrawing `Crafty.DrawManager.drawAll`
		* - Otherwise, clear the dirty regions, and redraw entities overlapping the dirty regions.
		* ~~~
		* 
        * @see Canvas.draw, DOM.draw
		*/
		draw: function draw() {
			//if nothing in dirty_rects, stop
			if (!dirty_rects.length && !dom.length) return;

			var i = 0, l = dirty_rects.length, k = dom.length, rect, q,
				j, len, dupes, obj, ent, objs = [], ctx = Crafty.canvas.context;

			//loop over all DOM elements needing updating
			for (; i < k; ++i) {
				dom[i].draw()._changed = false;
			}
			//reset DOM array
            dom.length = 0;

			// jc - if viewport dirty, simply redraw everything
			if (dirty_viewport)
			{
				this.drawAll();
				dirty_viewport = false;
				dirty_rects.length = 0;
				return;
			}

			//again, stop if nothing in dirty_rects
			if (!l) { return; }

			//if the amount of rects is over 60% of the total objects
			//do the naive method redrawing
			if (l / this.total2D > 0.6) {
				this.drawAll();
				dirty_rects.length = 0;
				return;
			}

			dirty_rects = this.merge(dirty_rects);
			for (i = 0; i < l; ++i) { //loop over every dirty rect
				rect = dirty_rects[i];
				if (!rect) continue;
				q = Crafty.map.search(rect, false); //search for ents under dirty rect

				dupes = {};

				//loop over found objects removing dupes and adding to obj array
				for (j = 0, len = q.length; j < len; ++j) {
					obj = q[j];

					if (dupes[obj[0]] || !obj._visible || !obj.__c.Canvas)
						continue;
					dupes[obj[0]] = true;

					objs.push({ obj: obj, rect: rect });
				}

				//clear the rect from the main canvas
				ctx.clearRect(rect._x, rect._y, rect._w, rect._h);

			}

			//sort the objects by the global Z
			objs.sort(function (a, b) { return a.obj._globalZ - b.obj._globalZ; });
			if (!objs.length){ return; }

			//loop over the objects
			for (i = 0, l = objs.length; i < l; ++i) {
				obj = objs[i];
				rect = obj.rect;
				ent = obj.obj;

				var area = ent._mbr || ent,
					x = (rect._x - area._x <= 0) ? 0 : ~~(rect._x - area._x),
					y = (rect._y - area._y < 0) ? 0 : ~~(rect._y - area._y),
					w = ~~Math.min(area._w - x, rect._w - (area._x - rect._x), rect._w, area._w),
					h = ~~Math.min(area._h - y, rect._h - (area._y - rect._y), rect._h, area._h);

				//no point drawing with no width or height
				if (h === 0 || w === 0) continue;

				ctx.save();
				ctx.beginPath();
				ctx.moveTo(rect._x, rect._y);
				ctx.lineTo(rect._x + rect._w, rect._y);
				ctx.lineTo(rect._x + rect._w, rect._h + rect._y);
				ctx.lineTo(rect._x, rect._h + rect._y);
				ctx.lineTo(rect._x, rect._y);

				ctx.clip();

				ent.draw();
				ctx.closePath();
				ctx.restore();

				//allow entity to re-dirty_rects
				ent._changed = false;
			}

			//empty dirty_rects
			dirty_rects.length = 0;
			//all merged IDs are now invalid
			merged = {};
		}
	};
}