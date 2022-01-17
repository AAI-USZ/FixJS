function addElementListFuncs(list, undef) {
		function eachlist(callback) {
			return each(list, callback);
		};
		
		/**
		 * @id each
		 * @module 1
		 * @requires dollar
		 * @configurable yes
		 * @name list.each()
		 * @syntax each(callback)
		 * Invokes the given function once for each item in the list with the item as first parameter and the zero-based index as second.
		 * @param callback the callback to invoke.
		 * @return the list
		 */
		list['each'] = eachlist;
		
		/**
		 * @id filter
		 * @module 1
		 * @requires dollar
		 * @configurable yes
		 * @name list.filter()
		 * @syntax filter(filterFunc)
		 * Creates a new list that contains only those items approved by the given function. The function is called once for each item. 
		 * If it returns true, the item is in the returned list, otherwise it will be removed.
		 * @param filterFunc the callback to invoke for each item with the item as only argument
		 * @return the new list
		 */
		list['filter'] = function(filterFunc) {
		    return addElementListFuncs(filter(list, filterFunc));
		};
		
		/**
		 * @id find
		 * @module 1
		 * @requires dollar
		 * @configurable yes
		 * @name list.find()
		 * @syntax find(selector)
		 * Finds all children of the list's elements that match the given selector.
		 * @param selector the selector to use (see MINI())
		 * @return the new list containing matches
		 */
		list['find'] = function(selector) {
		    return MINI(selector, list);
		};
		
		/**
		 * @id listremove
		 * @module 1
		 * @requires dollar
		 * @configurable yes
		 * @name list.remove()
		 * @syntax remove()
		 * Removes all nodes of the list from the DOM tree.
		 */
		list['remove'] = function() {
			for (var j = list.length-1; j >= 0; j--) // go backward - NodeList may shrink when elements are removed!
				list[j].parentNode.removeChild(list[j]);
		};
		/**
		 * @id listremovechildren
		 * @module 1
		 * @requires dollar listremove
		 * @configurable yes
		 * @name list.removeChildren()
		 * @syntax removeChildren()
		 * Removes all child nodes from the list's elements, but does not remove the list nodes themselves.
		 * @return the list
		 */
		list['removeChildren'] = function() {
			return eachlist(function(li) {
				MINI(li.childNodes).remove();
			});
		};
		/**
		 * @id set
		 * @module 1
		 * @requires dollar getnamecomponents
		 * @configurable yes
		 * @name list.set()
		 * @syntax MINI(selector).set(name, value)
		 * @syntax MINI(selector).set(properties)
		 * @syntax MINI(selector).set(name, value, defaultFunction)
		 * @syntax MINI(selector).set(properties, undefined, defaultFunction)
		 * Modifies the list's DOM elements or objects by setting their properties and/or attributes.
		 * @param name the name of a single property or attribute to modify. If prefixed with '@', it is treated as a DOM element's attribute. 
		 *                     If it contains one or more dots ('.'), the function will traverse the properties of those names.
		 *                     A hash ('#') prefix is a shortcut for 'style.' and will also replace all '_' with '-' in the name.
		 * @param value the value to set
		 * @param properties a map containing names as keys and the values to set as map values
		 * @return the list
		 */
		function set(name, value, defaultFunction) {
			// @cond if (name == null) error("First argument must be set!");
			if (value === undef) 
				each(name, function(n,v) { list['set'](n, v,defaultFunction); });
			else {
				// @cond if (!/string/i.test(typeof name)) error('If second argument is given, the first one must be a string specifying the property name");
				var components = getNameComponents(name), len = components.length-1, i;
				var n = name.substring(1);
				var f = typeof value == 'function' ? value : (defaultFunction || function(){ return value; });
				eachlist((/^@/.test(name)) ? 
					function(obj, c) {
						obj.setAttribute(n, f(obj, obj.getAttribute(n), c, value));
					}
					:
					function(obj, c) {
						for (i = 0; i < len; i++)
							obj = obj[components[i]];
						obj[components[len]] = f(obj, obj[components[len]], c, value);
					});
			}
			return list;
		};
		list['set'] = set;
		list['append'] = function (name, value) { return set(name, value, function(obj, oldValue, idx, newValue) { return toString(oldValue) + newValue;});};
		list['prepend'] = function (name, value) { return set(name, value, function(obj, oldValue, idx, newValue) { return newValue + toString(oldValue);});};

		/**
		 * @id listanimate
		 * @module 7
		 * @requires runanimation dollar getnamecomponents tostring
		 * @configurable yes
		 * @name list.animate()
		 * @syntax MINI(selector).animate(properties)
		 * @syntax MINI(selector).animate(properties, durationMs)
		 * @syntax MINI(selector).animate(properties, durationMs, linearity)
		 * @syntax MINI(selector).animate(properties, durationMs, linearity, callback)
		 * @shortcut $(selector).animate(properties, durationMs, linearity, callback) - Enabled by default, unless disabled with "Disable $ and EL" option
		 * Animates the objects or elements of the list by modifying their properties and attributes.
		 * @param list a list of objects
		 * @param properties a property map describing the end values of the corresponding properties. The names can use the
		 *                   MINI.set syntax ('@' prefix for attributes, '$' for styles). Values must be either numbers, numbers with
		 *                   units (e.g. "2 px") or colors ('rgb(r,g,b)', '#rrggbb' or '#rgb'). The properties will be set 
		 *                   for all elements of the list.
		 * @param durationMs optional the duration of the animation in milliseconds. Default: 500ms;
		 * @param linearity optional defines whether the animation should be linear (1), very smooth (0) or something between. Default: 0.
		 * @param callback optional if given, this function will be invoked the list as parameter when the animation finished
		 * @param delayMs optional if set, the animation will be delayed by the given time in milliseconds. Default: 0;
		 * @return the list
		 */
		list['animate'] = function (properties, durationMs, linearity, callback, delayMs) {
			  // @cond debug if (!properties || typeof properties == 'string') error('First parameter must be a map of properties (e.g. "{top: 0, left: 0}") ');
			  // @cond debug if (callback || typeof callback == 'function') error('Fourth is optional, but if set it must be a callback function.');
			  // @cond debug var colorRegexp = /^(rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|#\w{3}|#\w{6})\s*$/i;
				function toNumWithoutUnit(v) {
					return parseFloat(toString(v).replace(/[^0-9]+$/, ''));
				}
				function findUnit(v) {
					return toString(v).replace(/^([+-]=)?-?[0-9. ]+\s*/, ' ').replace(/^ $/, '');
				}
				if (delayMs)
					window.setTimeout(function(){list['animate'](properties, durationMs, linearity, callback);}, delayMs);
				else {
					durationMs = durationMs || 500;
					linearity = Math.max(0, Math.min(1, linearity || 0));
					var initState = []; // for each item contains a map {s:{}, e:{}, o} s/e are property name -> startValue of start/end. The item is in o.
					eachlist(function(li) {
						var p = {o:MINI(li), s:{}, e:{}, u:{}}; 
						each(properties, function(name) {
							var dest = properties[name];
							var components = getNameComponents(name), len=components.length-1;
							var a = li;
							for (var j = 0; j < len; j++) 
								a = a[components[j]];
							p.s[name] = ((/^@/.test(name)) ? li.getAttribute(name.substr(1)) : a[components[len]]) || 0;
							p.e[name] = /^[+-]=/.test(dest) ?
								toNumWithoutUnit(p.s[name]) + toNumWithoutUnit(dest.substr(2)) * (dest.charAt(0)=='-' ? -1 : 1) + findUnit(dest) 
								: dest;
							// @cond debug if (!colorRegexp.test(dest) && isNan(toNumWithoutUnit(dest))) error('End value of "'+name+'" is neither color nor number: ' + toString(dest));
							// @cond debug if (!colorRegexp.test(p.s[name]) && isNan(toNumWithoutUnit(p.s[name]))) error('Start value of "'+name+'" is neither color nor number: ' + toString(p.s[name]));
							// @cond debug if (colorRegexp.test(dest) && !colorRegexp.test(p.s[name])) error('End value of "'+name+'" looks like a color, but start value does not: ' + toString(p.s[name]));
							// @cond debug if (colorRegexp.test(p.s[name]) && !colorRegexp.test(dest)) error('Start value of "'+name+'" looks like a color, but end value does not: ' + toString(dest));
						});
						initState.push(p);
					});

					function interpolate(startValue, endValue, t) {
						var c = (endValue - startValue)*t*t/(durationMs*durationMs);
						return startValue + 
						  linearity * t/durationMs * (endValue - startValue) +   // linear equation
						  (1-linearity) * (3*c - 2*c*t/durationMs);              // bilinear equation
					}
					function getColorComponent(colorCode, index) {
						return (/^#/.test(colorCode)) ?
							parseInt(colorCode.length > 6 ? colorCode.substr(1+index*2, 2) : ((colorCode=colorCode.charAt(1+index))+colorCode), 16)
							:
							parseInt(colorCode.replace(/[^\d,]+/g, '').split(',')[index]);
					}

					runAnimation(function(timePassedMs, stop) {
						if (timePassedMs >= durationMs || timePassedMs < 0) {
							each(initState, function(isi) {
								isi.o.set(isi.e);
							});
							stop();
							if (callback) 
								callback(list);
						}
						else
							each(initState, function(isi) {
								each(isi.s, function(name, start) {
									var newValue= 'rgb(', end=isi.e[name];
									if (/^#|rgb\(/.test(end)) { // color in format '#rgb' or '#rrggbb' or 'rgb(r,g,b)'?
										for (var i = 0; i < 3; i++) 
											newValue += Math.round(interpolate(getColorComponent(start, i), getColorComponent(end, i), timePassedMs)) + (i < 2 ? ',' : ')');
									}
									else 
										newValue = interpolate(toNumWithoutUnit(start), toNumWithoutUnit(end), timePassedMs) + findUnit(end);
									isi.o.set(name, newValue);
								});
							});
					});
				}
				return list;		
			};

		
		    /**
			 * @id listaddevent
			 * @module 5
			 * @requires dollar
			 * @configurable yes
			 * @name list.addEvent()
			 * @syntax MINI(selector).addEvent(el, name, handler)
			 * @shortcut $(selector).addEvent(el, name, handler) - Enabled by default, unless disabled with "Disable $ and EL" option
		     * Registers the given function as handler for the event with the given name. It is possible to register several
		     * handlers for a single event.
		     * 
		     * All handlers get a the original event object and minified's compatibility event object as arguments, and 'this' set to the source element
		     * of the event (e.g. the button that has been clicked). The original event object the is object given to the event or obtained 
		     * from 'window.event'. The compatibility event object has the following properties:
		     * <ul>
		     * <li><code>keyCode</code> - the key code, if it was a key press. Will return event.keyCode if set, otherwise event.which. This should work in practically all browsers. 
		     *                                              See http://unixpapa.com/js/key.html for key code tables.</li>
		     * <li><code>button</code> - the mouse button pressed, for mouse events. Note that the value is browser-dependent and <strong>not reliable</strong>. Better check rightClick.</li>
		     * <li><code>rightClick</code> - true if the right mouse button has been clicked, false otherwise. Works browser-independently.</li>
		     * <li><code>wheelDir</code> - for mouse wheel or scroll events, the direction (1 for up or -1 for down)</li>
		     * <li><code>pageX</code> - the page coordinate of the event
		     * <li><code>pageY</code> - the page coordinate of the event
		     * </ul>
		     * If the handler returns 'false', the event will not be propagated to other handlers.
		     * 
		     * @param name the name of the event, e.g. 'click'. Case-sensitive. The 'on' prefix in front of the name must not used.
		     * @param handler the function to invoke when the event has been triggered. The handler gets the original event object as
		     *                first parameter and the compatibility object as second. 'this' is the element that caused the event.
		     *                If the handler returns false, all processing of the event will be stopped.
		     * @return the list
		     */
			list['addEvent'] = function (name, handler) {
			    // @cond debug if (!(name && handler)) error("Both parameters to addEvent() are required!"); 
			    // @cond debug if (/^on/i.test(name)) error("The event name looks invalid. Don't use an 'on' prefix (e.g. use 'click', not 'onclick'"); 
				return eachlist(function(el) {
					function newHandler(e) {
						e = e || window.event;
						var l = document.documentElement, b = document.body;
						var evObj = { 
								keyCode: e.keyCode || e.which, // http://unixpapa.com/js/key.html
								button: e.which || e.button,
								rightClick: e.which ? (e.which == 3) : (e.button == 2)
							};
						
						if (e.clientX || e.clientY) {
							evObj.pageX = l.scrollLeft + b.scrollLeft + e.clientX;
							evObj.pageY = l.scrollTop + b.scrollTop + e.clientY;
						}
						if (e.detail || e.wheelDelta)
							evObj.wheelDir = (e.detail < 0 || e.wheelDelta > 0) ? 1 : -1;
						
						// @cond debug try {
						if (handler.call(e.target, e, evObj) === false) {
							if (e.preventDefault) // W3C DOM2 event cancelling
								e.preventDefault();
							if (e.stopPropagation) // cancel bubble for W3C DOM
								e.stopPropagation();
							e.returnValue = false; // cancel for IE
							e.cancelBubble = true; // cancel bubble for IE
						}
						// @cond debug } catch (ex) { error("Error in event handler \""+name+"\": "+ex); }
					};
					handler['MEHL'] = newHandler; // MINIEventHandLer, for deleting the right function
					if (el.addEventListener)
						el.addEventListener(name, newHandler, true); // W3C DOM
					else 
						el.attachEvent('on'+name, newHandler);  // IE < 9 version
				});
		};
		
		
	    /**
		 * @id listremoveevent
		 * @module 5
		 * @requires dollar listaddevent
		 * @configurable yes
		 * @name list.removeEvent()
		 * @syntax MINI.removeEvent(element, name, handler)
	     * Removes the event handler. The call will be ignored if the given handler is not registered.
	     * @param name the name of the event (see addEvent)
	     * @param handler the handler to unregister, as given to addEvent()
	     * @return the list
	     */
		list['removeEvent'] = function (name, handler) {
			// @cond debug if (!name || !name.substr) error("No name given or name not a string.");
			// @cond debug if (!handler || !handler['MEHL']) error("No handler given or handler invalid.");
			handler = handler['MEHL'];
	    	return eachlist(function(el) {
				if (el.addEventListener)
					el.removeEventListener(name, handler, true); // W3C DOM
				else 
					el.detachEvent('on'+name, handler);  // IE < 9 version
	    	});
		};
		
	    /**
		 * @id listoffset
		 * @module 1
		 * @requires dollar
		 * @configurable yes
		 * @name list.offset()
		 * @syntax MINI(selector).offset()
		 * @shortcut $(selector).offset() - Enabled by default, unless disabled with "Disable $ and EL" option
	     * Returns the page coordinates of the list's first element.
	     * @param element the element
	     * @return an object containing pixel coordinates in two properties 'left' and 'top'
	     */
		list['offset'] = function() {
			var elem = list[0];
			var dest = {left: 0, top: 0};
			while (elem) {
				dest.left += elem.offsetLeft;
				dest.top += elem.offsetTop;
				elem = elem.offsetParent;
			}
			return dest;
	     };

	    /**
	     * @id createclassnameregexp
	     * @dependency yes
	     */
	    function createClassNameRegExp(className) {
	        return new RegExp(backslashB + className + backslashB);
	    }
	    
	    /**
	     * @id removeclassregexp
	     * @dependency yes
	     */
		function removeClassRegExp(el, reg) {
			return el.className.replace(reg, '').replace(/^\s+|\s+$/g, '').replace(/\s\s+/g, ' ');
		}
	    
	    /**
	     * @id listhasclass
	     * @module 1
	     * @requires dollar createclassnameregexp
	     * @configurable yes
		 * @name list.hasClass()
	     * @syntax hasClass(className)
	     * Checks whether any element in the list of nodes has a class with the given name. Returns the first node if found, or null if not found.
	     * @param className the name to find 
	     * @return the first element found with the class name, or null if not found
	     */
	    list['hasClass'] = function(className) {
	        var reg = createClassNameRegExp(className); 
	        for (var i = 0; i < list.length; i++)
	        	if (reg.test(list[i].className||''))
	           		return list[i];
	        // fall through if no match!
	    };

	    /**
	     * @id listremoveclass
	     * @module 1
	     * @requires dollar createclassnameregexp removeclassregexp
	     * @configurable yes
		 * @name list.removeClass()
	     * @syntax removeClass(className)
	     * Removes the given class from all elements of the list.
	     * @param className the name to remove
	     */
	    list['removeClass'] = function(className) {
	        var reg = createClassNameRegExp(className);
	        return eachlist(function(li) {
	        	li.className = removeClassRegExp(li, reg);
	        });
	    };

	    /**
	     * @id listaddclass
	     * @module 1
	     * @requires dollar listremoveclass
	     * @configurable yes
		 * @name list.addClass()
	     * @syntax addClass(className)
	     * Adds the given class name to all elements to the list.
	     * @param className the name to add
	     */
	    list['addClass'] = function(className) {
	        list['removeClass'](className);
	        return eachlist(function(li) {
	            if (li.className)
	                li.className += ' ' + className;
	            else
	                li.className = className;
	        });
	    };

	    /**
	     * @id listtoggleclass
	     * @module 1
	     * @requires dollar createclassnameregexp removeclassregexp
	     * @configurable yes
		 * @name list.toggleClass()
	     * @syntax toggleClass(className)
	     * Checks for all elements of the list whether they have the given class. If yes, it will be removed. Otherwise it will be added.
	     * @param className the name to toggle
	     */
	    list['toggleClass'] = function(className) {
	        var reg = createClassNameRegExp(className);
	        return eachlist(function(li) {
	        	li.className = li.className ? (reg.test(li.className) ? removeClassRegExp(li, reg) : (' ' + className)) : className;
	        });
	    };
	    /**
	     * @id addelementlistfuncend
	     * @dependency yes
	     */
		return list;
	}