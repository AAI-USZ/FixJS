function() {
	$.fn.doodad = function () {
		///<summary>
		/// Returns the doodads that back the elements in a particular jQuery list of elements.
		/// This method is useful if you have a reference to the DOM elememt of a doodad,
		/// but not the doodad itself.
		///</summary>
		///<returns>
		/// If none of the elements have a backing doodad, then returns undefined.
		/// If only one of the elements has a doodad, then that doodad is returned.
		/// If some/all of the elements have a doodad, then the input array is mapped into an
		/// array where elements have a doodad are populated
		///</returns>
		var set = $.map(this, function (element, index) {
			return $(element).data(doodads.config.domDataKey);
		});

		switch (set.length) {
			case 0:
				return undefined;
			case 1:
				return set[0];
			default:
				return set;
		}
	}

	/**
	 * Debounce and throttle functions adatapted from http://code.google.com/p/jquery-debounce/
	 * Used under the MIT license
	 *
	 * Proxy functions adapted from Underscore.js (http://documentcloud.github.com/underscore/underscore.js)
	 * Used under the MIT license
	 */
	$.extend(doodads, {
		debounce: function doodads$debounce(fn, timeout, invokeAsap, ctx) {
			if(arguments.length == 3 && typeof invokeAsap != 'boolean') {
				ctx = invokeAsap;
				invokeAsap = false;
			}

			var timer;

			return function() {
				var args = arguments;
				ctx = ctx || this;

				invokeAsap && !timer && fn.apply(ctx, args);

				clearTimeout(timer);

				timer = setTimeout(function() {
					!invokeAsap && fn.apply(ctx, args);
					timer = null;
				}, timeout);
			};
		},

		throttle: function doodads$throttle(fn, timeout, ctx) {
			var timer, args, needInvoke;

			return function() {
				args = arguments;
				needInvoke = true;
				ctx = ctx || this;

				if(!timer) {
					(function() {
						if(needInvoke) {
							fn.apply(ctx, args);
							needInvoke = false;
							timer = setTimeout(arguments.callee, timeout);
						}
						else {
							timer = null;
						}
					})();
				}
			};
		},
		
		proxy: function doodads$proxy(func, context) {
			var bound, args,
				protoBind = Function.prototype.bind,
				protoSlice = Array.prototype.slice;

			if (func.bind === protoBind && protoBind) {
				return protoBind.apply(func, protoSlice.call(arguments, 1));
			}
			if (!Object.toString.prototype.call(func) == '[object Function]') {
				throw new TypeError;
			}
			args = protoSlice.call(arguments, 2);
			return bound = function() {
				if (!(this instanceof bound)) {
					return func.apply(context, args.concat(protoSlice.call(arguments)));
				}
				var ctor = function(){};
				ctor.prototype = func.prototype;
				var self = new ctor,
					result = func.apply(self, args.concat(protoSlice.call(arguments)));
				if (Object(result) === result) {
					return result;
				}
				return self;
			};
		}
	});
	
	$.extend(doodads, {
		/* 
		Taken from jQuery UI 
		https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.core.js
		Used under the MIT License
		*/
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91, // COMMAND
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93, // COMMAND_RIGHT
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91 // COMMAND
		},
		
		mouseCode: {
			left: 1,
			middle: 2,
			right: 3
		}
	});
	
	// one event named 'scroll' is not good enough
	// to determine when something scrolls apparently
	var scrollEvents = ['scroll', 'mousewheel', 'wheel', 'DOMMouseScroll'],
		ancestornamespace = '.ancestorpluginguid';

    function rebind(self, handleObj, action) {
		var n = handleObj.namespace === '' ? '' : '.' + handleObj.namespace,
			evs = $.map(scrollEvents, function (ev) {
			    return ev + ancestornamespace + handleObj.guid + n;
			});

		$(self).parents().add('window')[action](evs.join(' '), handleObj.handler);
	}

	$.event.special.ancestorscroll = {
		add: function (handleObj) {
			rebind(this, handleObj, 'bind');
		}
		, remove: function (handleObj) {
			rebind(this, handleObj, 'unbind');
		}
	}
}