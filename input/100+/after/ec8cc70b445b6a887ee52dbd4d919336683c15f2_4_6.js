function() {

	// returns if something is an object with properties of its own
	var canMakeObserve = function( obj ) {
			return typeof obj === 'object' && obj !== null && obj && !(obj instanceof Date);
		},
		// listens to changes on val and 'bubbles' the event up
		// - val the object to listen to changes on
		// - prop the property name val is at on
		// - parent the parent object of prop
		hookupBubble = function( val, prop, parent ) {
			// if it's an array make a list, otherwise a val
			if (val instanceof Observe){
				// we have an observe already
				// make sure it is not listening to this already
				unhookup([val], parent._namespace)
			} else if ( Can.isArray(val) ) {
				val = new Observe.List(val)
			} else {
				val = new Observe(val)
			}
			// attr (like target, how you (delegate) to get to the target)
            // currentAttr (how to get to you)
            // delegateAttr (hot to get to the delegated Attr)
			
			//listen to all changes and batchTrigger upwards
			val.bind("change" + parent._namespace, function( ev, attr ) {
				// batchTrigger the type on this ...
				var args = Can.makeArray(arguments),
					ev = args.shift();
				if(prop === "*"){
					args[0] = parent.indexOf(val)+"." + args[0]
				} else {
					args[0] = prop +  "." + args[0]
				}
				Can.trigger(parent, ev, args);
			});

			return val;
		},
		// removes all listeners
		unhookup = function(items, namespace){
			return Can.each(items, function(i, item){
				if(item && item.unbind){
					item.unbind("change" + namespace)
				}
			});
		},
		// an id to track events for a given observe
		observeId = 0,
		// a reference to an array of events that will be dispatched
		collecting = null,
		// call to start collecting events (Observe sends all events at once)
		collect = function() {
			if (!collecting ) {
				collecting = [];
				return true;
			}
		},
		// creates an event on item, but will not send immediately 
		// if collecting events
		// - item - the item the event should happen on
		// - event - the event name ("change")
		// - args - an array of arguments
		batchTrigger = function( item, event, args ) {
			// send no events if initalizing
			if (item._init) {
				return;
			}
			if (!collecting ) {
				return Can.trigger(item, event, args);
			} else {
				collecting.push([
				item,
				{
					type: event,
					batchNum : batchNum
				}, 
				args ] );
			}
		},
		// which batch of events this is for, might not want to send multiple
		// messages on the same batch.  This is mostly for 
		// event delegation
		batchNum = 1,
		// sends all pending events
		sendCollection = function() {
			var len = collecting.length,
				items = collecting.slice(0),
				cur;
			collecting = null;
			batchNum ++;
			for ( var i = 0; i < len; i++ ) {
				Can.trigger.apply(Can, items[i])
			}
			
		},
		// a helper used to serialize an Observe or Observe.List where:
		// observe - the observable
		// how - to serialize with 'attr' or 'serialize'
		// where - to put properties, in a {} or [].
		serialize = function( observe, how, where ) {
			// go through each property
			observe.each(function( name, val ) {
				// if the value is an object, and has a attrs or serialize function
				where[name] = canMakeObserve(val) && typeof val[how] == 'function' ?
				// call attrs or serialize to get the original data back
				val[how]() :
				// otherwise return the value
				val
			})
			return where;
		},
		$method = function( name ) {
			return function( eventType, handler ) {
				return Can[name].apply(this, arguments );
			}
		},
		bind = $method('addEvent'),
		unbind = $method('removeEvent'),
		attrParts = function(attr){
			return Can.isArray(attr) ? attr : (""+attr).split(".")
		};

	/**
	 * @class Can.Observe
	 * @parent jquerymx.lang
	 * @test can/observe/qunit.html
	 * 
	 * Observe provides the awesome observable pattern for
	 * JavaScript Objects and Arrays. It lets you
	 * 
	 *   - Set and remove property or property values on objects and arrays
	 *   - Listen for changes in objects and arrays
	 *   - Work with nested properties
	 * 
	 * ## Creating an Can.Observe
	 * 
	 * To create an Can.Observe, or Can.Observe.List, you can simply use 
	 * the `$.O(data)` shortcut like:
	 * 
	 *     var person = $.O({name: 'justin', age: 29}),
	 *         hobbies = $.O(['programming', 'basketball', 'nose picking'])
	 * 
	 * Depending on the type of data passed to $.O, it will create an instance of either: 
	 * 
	 *   - Can.Observe, which is used for objects like: `{foo: 'bar'}`, and
	 *   - [Can.Observe.List Can.Observe.List], which is used for arrays like `['foo','bar']`
	 *   
	 * Can.Observe.List and Can.Observe are very similar. In fact,
	 * Can.Observe.List inherits Can.Observe and only adds a few extra methods for
	 * manipulating arrays like [Can.Observe.List.prototype.push push].  Go to
	 * [Can.Observe.List Can.Observe.List] for more information about Can.Observe.List.
	 * 
	 * You can also create a `new Can.Observe` simply by pass it the data you want to observe:
	 * 
	 *     var data = { 
	 *       addresses : [
	 *         {
	 *           city: 'Chicago',
	 *           state: 'IL'
	 *         },
	 *         {
	 *           city: 'Boston',
	 *           state : 'MA'
	 *         }
	 *         ],
	 *       name : "Justin Meyer"
	 *     },
	 *     o = new Can.Observe(data);
	 *     
	 * _o_ now represents an observable copy of _data_.  
	 * 
	 * ## Getting and Setting Properties
	 * 
	 * Use [Can.Observe.prototype.attr attr] and [Can.Observe.prototype.attr attrs]
	 * to get and set properties.
	 * 
	 * For example, you can read the property values of _o_ with
	 * `observe.attr( name )` like:
	 * 
	 *     // read name
	 *     o.attr('name') //-> Justin Meyer
	 *     
	 * And set property names of _o_ with 
	 * `observe.attr( name, value )` like:
	 * 
	 *     // update name
	 *     o.attr('name', "Brian Moschel") //-> o
	 * 
	 * Observe handles nested data.  Nested Objects and
	 * Arrays are converted to Can.Observe and 
	 * Can.Observe.Lists.  This lets you read nested properties 
	 * and use Can.Observe methods on them.  The following 
	 * updates the second address (Boston) to 'New York':
	 * 
	 *     o.attr('addresses.1').attr({
	 *       city: 'New York',
	 *       state: 'NY'
	 *     })
	 * 
	 * `attr()` can be used to get all properties back from the observe:
	 * 
	 *     o.attr() // -> 
	 *     { 
	 *       addresses : [
	 *         {
	 *           city: 'Chicago',
	 *           state: 'IL'
	 *         },
	 *         {
	 *           city: 'New York',
	 *           state : 'MA'
	 *         }
	 *       ],
	 *       name : "Brian Moschel"
	 *     }
	 * 
	 * ## Listening to property changes
	 * 
	 * When a property value is changed, it creates events
	 * that you can listen to.  There are two ways to listen
	 * for events:
	 * 
	 *   - [Can.Observe.prototype.bind bind] - listen for any type of change
	 *   - [Can.Observe.prototype.delegate delegate] - listen to a specific type of change
	 *     
	 * With `bind( "change" , handler( ev, attr, how, newVal, oldVal ) )`, you can listen
	 * to any change that happens within the 
	 * observe. The handler gets called with the property name that was
	 * changed, how it was changed ['add','remove','set'], the new value
	 * and the old value.
	 * 
	 *     o.bind('change', function( ev, attr, how, nevVal, oldVal ) {
	 *     
	 *     })
	 * 
	 * `delegate( attr, event, handler(ev, newVal, oldVal ) )` lets you listen
	 * to a specific event on a specific attribute. 
	 * 
	 *     // listen for name changes
	 *     o.delegate("name","set", function(){
	 *     
	 *     })
	 *     
	 * Delegate lets you specify multiple attributes and values to match 
	 * for the callback. For example,
	 * 
	 *     r = $.O({type: "video", id : 5})
	 *     r.delegate("type=images id","set", function(){})
	 *     
	 * This is used heavily by [Can.route $.route].
	 * 
	 * @constructor
	 * 
	 * @param {Object} obj a JavaScript Object that will be 
	 * converted to an observable
	 */
	var Observe = Can.Construct('Can.Observe',{
		// keep so it can be overwritten
		setup : function(baseClass){
			Can.Construct.setup.apply(this, arguments)
		},
		bind : bind,
		unbind: unbind
	},
	/**
	 * @prototype
	 */
	{
		setup: function( obj ) {
			// _data is where we keep the properties
			this._data = {};
			// the namespace this object uses to listen to events
			this._namespace = ".observe" + (++observeId);
			// sets all attrs
			this._init = 1;
			this.attr(obj);
			delete this._init;
		},
		/**
		 * Get or set an attribute on the observe.
		 * 
		 *     o = new Can.Observe({});
		 *     
		 *     // sets a user property
		 *     o.attr('user',{name: 'hank'});
		 *     
		 *     // read the user's name
		 *     o.attr('user.name') //-> 'hank'
		 * 
		 * If a value is set for the first time, it will batchTrigger 
		 * an `'add'` and `'set'` change event.  Once
		 * the value has been added.  Any future value changes will
		 * batchTrigger only `'set'` events.
		 * 
		 * 
		 * @param {String} attr the attribute to read or write.
		 * 
		 *     o.attr('name') //-> reads the name
		 *     o.attr('name', 'Justin') //-> writes the name
		 *     
		 * You can read or write deep property names.  For example:
		 * 
		 *     o.attr('person', {name: 'Justin'})
		 *     o.attr('person.name') //-> 'Justin'
		 * 
		 * @param {Object} [val] if provided, sets the value.
		 * @return {Object} the observable or the attribute property.
		 * 
		 * If you are reading, the property value is returned:
		 * 
		 *     o.attr('name') //-> Justin
		 *     
		 * If you are writing, the observe is returned for chaining:
		 * 
		 *     o.attr('name',"Brian").attr('name') //-> Justin
		 */
		attr: function( attr, val ) {
			var tAttr= typeof attr;
			if(tAttr != 'string' && tAttr != 'number'){
				return this._attrs(attr, val)
			}else if ( val === undefined ) {// if we are getting a value
				// let people know we are reading (
				Observe.__reading && Observe.__reading(this, attr)
				return this._get(attr)
			} else {
				// otherwise we are setting
				this._set(attr, val);
				return this;
			}
		},
		/**
		 * Iterates through each attribute, calling handler 
		 * with each attribute name and value.
		 * 
		 *     new Observe({foo: 'bar'})
		 *       .each(function(name, value){
		 *         equals(name, 'foo')
		 *         equals(value,'bar')
		 *       })
		 * 
		 * @param {function} handler(attrName,value) A function that will get 
		 * called back with the name and value of each attribute on the observe.
		 * 
		 * Returning `false` breaks the looping.  The following will never
		 * log 3:
		 * 
		 *     new Observe({a : 1, b : 2, c: 3})
		 *       .each(function(name, value){
		 *         console.log(value)
		 *         if(name == 2){
		 *           return false;
		 *         }
		 *       })
		 * 
		 * @return {Can.Observe} the original observable.
		 */
		each: function() {
			return Can.each.apply(null, [this.__get()].concat(Can.makeArray(arguments)))
		},
		/**
		 * Removes a property
		 * 
		 *     o =  new Can.Observe({foo: 'bar'});
		 *     o.removeAttr('foo'); //-> 'bar'
		 * 
		 * This creates a `'remove'` change event. Learn more about events
		 * in [Can.Observe.prototype.bind bind] and [Can.Observe.prototype.delegate delegate].
		 * 
		 * @param {String} attr the attribute name to remove.
		 * @return {Object} the value that was removed.
		 */
		removeAttr: function( attr ) {
			// convert the attr into parts (if nested)
			var parts = attrParts(attr),
				// the actual property to remove
				prop = parts.shift(),
				// the current value
				current = this._data[prop];

			// if we have more parts, call removeAttr on that part
			if ( parts.length ) {
				return current.removeAttr(parts)
			} else {
				// otherwise, delete
				delete this._data[prop];
				// create the event
				if (!(prop in this.constructor.prototype)) {
					delete this[prop]
				}
				batchTrigger(this, "change", [prop, "remove", undefined, current]);
				return current;
			}
		},
		// reads a property from the object
		_get: function( attr ) {
			var parts = attrParts(attr),
				current = this.__get(parts.shift());
			if ( parts.length ) {
				return current ? current._get(parts) : undefined
			} else {
				return current;
			}
		},
		// reads a property directly if an attr is provided, otherwise
		// returns the 'real' data object itself
		__get: function( attr ) {
			return attr ? this._data[attr] : this._data;
		},
		// sets attr prop as value on this object where
		// attr - is a string of properties or an array  of property values
		// value - the raw value to set
		// description - an object with converters / attrs / defaults / getterSetters ?
		_set: function( attr, value ) {
			// convert attr to attr parts (if it isn't already)
			var parts = attrParts(attr),
				// the immediate prop we are setting
				prop = parts.shift(),
				// its current value
				current = this.__get(prop);

			// if we have an object and remaining parts
			if ( canMakeObserve(current) && parts.length ) {
				// that object should set it (this might need to call attr)
				current._set(parts, value)
			} else if (!parts.length ) {
				// we're in 'real' set territory
				
				this.__set(prop, value, current)
				
			} else {
				throw "Can.Observe: set a property on an object that does not exist"
			}
		},
		__set : function(prop, value, current){
			// otherwise, we are setting it on this object
			// todo: check if value is object and transform
			// are we changing the value
			if ( value !== current ) {

				// check if we are adding this for the first time
				// if we are, we need to create an 'add' event
				var changeType = this.__get().hasOwnProperty(prop) ? "set" : "add";

				// set the value on data
				this.___set(prop,
				// if we are getting an object
				canMakeObserve(value) ?
				// hook it up to send event to us
				hookupBubble(value, prop, this) :
				// value is normal
				value);



				// batchTrigger the change event
				batchTrigger(this, "change", [prop, changeType, value, current]);
				batchTrigger(this, prop, value, current);
				// if we can stop listening to our old value, do it
				current && unhookup([current], this._namespace);
			}

		},
		// directly sets a property on this object
		___set: function( prop, val ) {
			this._data[prop] = val;
			// add property directly for easy writing
			// check if its on the prototype so we don't overwrite methods like attrs
			if (!(prop in this.constructor.prototype)) {
				this[prop] = val
			}
		},
		/**
		 * Listens to changes on a Can.Observe.
		 * 
		 * When attributes of an observe change, including attributes on nested objects,
		 * a `'change'` event is triggered on the observe.  These events come
		 * in three flavors:
		 * 
		 *   - `add` - a attribute is added
		 *   - `set` - an existing attribute's value is changed
		 *   - `remove` - an attribute is removed
		 * 
		 * The change event is fired with:
		 * 
		 *  - the attribute changed
		 *  - how it was changed
		 *  - the newValue of the attribute
		 *  - the oldValue of the attribute
		 * 
		 * Example:
		 * 
		 *     o = new Can.Observe({name : "Payal"});
		 *     o.bind('change', function(ev, attr, how, newVal, oldVal){
		 *       // ev    -> {type: 'change'}
		 *       // attr  -> "name"
		 *       // how   -> "add"
		 *       // newVal-> "Justin"
		 *       // oldVal-> undefined 
		 *     })
		 *     
		 *     o.attr('name', 'Justin')
		 * 
		 * Listening to `change` is only useful for when you want to 
		 * know every change on an Observe.  For most applications,
		 * [Can.Observe.prototype.delegate delegate] is 
		 * much more useful as it lets you listen to specific attribute
		 * changes and sepecific types of changes.
		 * 
		 * 
		 * @param {String} eventType the event name.  Currently,
		 * only 'change' events are supported. For more fine 
		 * grained control, use [Can.Observe.prototype.delegate].
		 * 
		 * @param {Function} handler(event, attr, how, newVal, oldVal) A 
		 * callback function where
		 * 
		 *   - event - the event
		 *   - attr - the name of the attribute changed
		 *   - how - how the attribute was changed (add, set, remove)
		 *   - newVal - the new value of the attribute
		 *   - oldVal - the old value of the attribute
		 * 
		 * @return {Can.Observe} the observe for chaining.
		 */
		bind: bind,
		/**
		 * Unbinds a listener.  This uses [http://api.jquery.com/unbind/ Can.unbind]
		 * and works very similar.  This means you can 
		 * use namespaces or unbind all event handlers for a given event:
		 * 
		 *     // unbind a specific event handler
		 *     o.unbind('change', handler)
		 *     
		 *     // unbind all change event handlers bound with the
		 *     // foo namespace
		 *     o.unbind('change.foo')
		 *     
		 *     // unbind all change event handlers
		 *     o.unbind('change')
		 * 
		 * @param {String} eventType - the type of event with
		 * any optional namespaces.  Currently, only `change` events
		 * are supported with bind.
		 * 
		 * @param {Function} [handler] - The original handler function passed
		 * to [Can.Observe.prototype.bind bind].
		 * 
		 * @return {Can.Observe} the original observe for chaining.
		 */
		unbind: unbind,
		/**
		 * Get the serialized Object form of the observe.  Serialized
		 * data is typically used to send back to a server.
		 * 
		 *     o.serialize() //-> { name: 'Justin' }
		 *     
		 * Serialize currently returns the same data 
		 * as [Can.Observe.prototype.attrs].  However, in future
		 * versions, serialize will be able to return serialized
		 * data similar to [Can.Model].  The following will work:
		 * 
		 *     new Observe({time: new Date()})
		 *       .serialize() //-> { time: 1319666613663 }
		 * 
		 * @return {Object} a JavaScript Object that can be 
		 * serialized with `JSON.stringify` or other methods. 
		 * 
		 */
		serialize: function() {
			return serialize(this, 'serialize', {});
		},
		/**
		 * Set multiple properties on the observable
		 * @param {Object} props
		 * @param {Boolean} remove true if you should remove properties that are not in props
		 */
		_attrs: function( props, remove ) {
			if ( props === undefined ) {
				return serialize(this, 'attr', {})
			}

			props = Can.extend(true, {}, props);
			var prop, 
				collectingStarted = collect(),
				self = this;
			
			this.each(function(prop, curVal){
				var newVal = props[prop];

				// if we are merging ...
				if ( newVal === undefined ) {
					remove && self.removeAttr(prop);
					return;
				}
				if ( canMakeObserve(curVal) && canMakeObserve(newVal) ) {
					curVal.attr(newVal, remove)
				} else if ( curVal != newVal ) {
					self._set(prop, newVal)
				} else {

				}
				delete props[prop];
			})
			// add remaining props
			for ( var prop in props ) {
				newVal = props[prop];
				this._set(prop, newVal)
			}
			if ( collectingStarted ) {
				sendCollection();
			}
			return this;
		}
	});
	// Helpers for list
	/**
	 * @class Can.Observe.List
	 * @inherits Can.Observe
	 * @parent Can.Observe
	 * 
	 * An observable list.  You can listen to when items are push, popped,
	 * spliced, shifted, and unshifted on this array.
	 * 
	 * 
	 */
	var splice = [].splice,
		list = Observe('Can.Observe.List',
	/**
	 * @prototype
	 */
	{
		setup: function( instances, options ) {
			this.length = 0;
			this._namespace = ".list" + (++observeId);
			this._init = 1;
			this.bind('change',Can.proxy(this._changes,this));
			this.push.apply(this, Can.makeArray(instances || []));
			Can.extend(this, options);
			//if(this.comparator){
			//	this.sort()
			//}
			delete this._init;
		},
		_changes : function(ev, attr, how, newVal, oldVal){
			// detects an add, sorts it, re-adds?			
			
			// if we are sorting, and an attribute inside us changed
			/*if(this.comparator && /^\d+./.test(attr) ) {
				
				// get the index
				var index = +/^\d+/.exec(attr)[0],
					// and item
					item = this[index],
					// and the new item
					newIndex = this.sortedIndex(item);
				
				if(newIndex !== index){
					// move ...
					splice.call(this, index, 1);
					splice.call(this, newIndex, 0, item);
					
					batchTrigger(this, "move", [item, newIndex, index]);
					ev.stopImmediatePropagation();
					batchTrigger(this,"change", [
						attr.replace(/^\d+/,newIndex),
						how,
						newVal,
						oldVal
					]);
					return;
				}
			}*/
			
			// if we add items, we need to handle 
			// sorting and such
			
			// batchTrigger direct add and remove events ...
			if(attr.indexOf('.') === -1){
				
				if( how === 'add' ) {
					batchTrigger(this, how, [newVal,+attr]);
					batchTrigger(this,'length',[this.length]);
				} else if( how === 'remove' ) {
					batchTrigger(this, how, [oldVal, +attr]);
					batchTrigger(this,'length',[this.length]);
				}
				
			}
			// issue add, remove, and move events ...
		},
		/*sortedIndex : function(item){
			var itemCompare = item.attr(this.comparator),
				equaled = 0,
				i;
			for(var i =0; i < this.length; i++){
				if(item === this[i]){
					equaled = -1;
					continue;
				}
				if(itemCompare <= this[i].attr(this.comparator) ) {
					return i+equaled;
				}
			}
			return i+equaled;
		},*/
		__get : function(attr){
			return attr ? this[attr] : this;
		},
		___set : function(attr, val){
			this[attr] = val;
		},
		/**
		 * Returns the serialized form of this list.
		 */
		serialize: function() {
			return serialize(this, 'serialize', []);
		},
		/**
		 * Iterates through each item of the list, calling handler 
		 * with each index and value.
		 * 
		 *     new Observe.List(['a'])
		 *       .each(function(index, value){
		 *         equals(index, 1)
		 *         equals(value,'a')
		 *       })
		 * 
		 * @param {function} handler(index,value) A function that will get 
		 * called back with the index and value of each item on the list.
		 * 
		 * Returning `false` breaks the looping.  The following will never
		 * log 'c':
		 * 
		 *     new Observe(['a','b','c'])
		 *       .each(function(index, value){
		 *         console.log(value)
		 *         if(index == 1){
		 *           return false;
		 *         }
		 *       })
		 * 
		 * @return {Can.Observe.List} the original observable.
		 */
		// placeholder for each
		/**
		 * Remove items or add items from a specific point in the list.
		 * 
		 * ### Example
		 * 
		 * The following creates a list of numbers and replaces 2 and 3 with
		 * "a", and "b".
		 * 
		 *     var l = new Can.Observe.List([0,1,2,3]);
		 *     
		 *     l.bind('change', function( ev, attr, how, newVals, oldVals, where ) { ... })
		 *     
		 *     l.splice(1,2, "a", "b"); // results in [0,"a","b",3]
		 *     
		 * This creates 2 change events.  The first event is the removal of 
		 * numbers one and two where it's callback values will be:
		 * 
		 *   - attr - "1" - indicates where the remove event took place
		 *   - how - "remove"
		 *   - newVals - undefined
		 *   - oldVals - [1,2] -the array of removed values
		 *   - where - 1 - the location of where these items where removed
		 * 
		 * The second change event is the addition of the "a", and "b" values where 
		 * the callback values will be:
		 * 
		 *   - attr - "1" - indicates where the add event took place
		 *   - how - "added"
		 *   - newVals - ["a","b"]
		 *   - oldVals - [1, 2] - the array of removed values
		 *   - where - 1 - the location of where these items where added
		 * 
		 * @param {Number} index where to start removing or adding items
		 * @param {Object} count the number of items to remove
		 * @param {Object} [added] an object to add to 
		 */
		splice: function( index, count ) {
			var args = Can.makeArray(arguments),
				i;

			for ( i = 2; i < args.length; i++ ) {
				var val = args[i];
				if ( canMakeObserve(val) ) {
					args[i] = hookupBubble(val, "*", this)
				}
			}
			if ( count === undefined ) {
				count = args[1] = this.length - index;
			}
			var removed = splice.apply(this, args);
			if ( count > 0 ) {
				batchTrigger(this, "change", [""+index, "remove", undefined, removed]);
				unhookup(removed, this._namespace);
			}
			if ( args.length > 2 ) {
				batchTrigger(this, "change", [""+index, "add", args.slice(2), removed]);
			}
			return removed;
		},
		/**
		 * Updates an array with a new array.  It is able to handle
		 * removes in the middle of the array.
		 * 
		 * @param {Array} props
		 * @param {Boolean} remove
		 */
		_attrs: function( props, remove ) {
			if ( props === undefined ) {
				return serialize(this, 'attr', []);
			}

			// copy
			props = props.slice(0);

			var len = Math.min(props.length, this.length),
				collectingStarted = collect();
			for ( var prop = 0; prop < len; prop++ ) {
				var curVal = this[prop],
					newVal = props[prop];

				if ( canMakeObserve(curVal) && canMakeObserve(newVal) ) {
					curVal.attr(newVal, remove)
				} else if ( curVal != newVal ) {
					this._set(prop, newVal)
				} else {

				}
			}
			if ( props.length > this.length ) {
				// add in the remaining props
				this.push(props.slice(this.length))
			} else if ( props.length < this.length && remove ) {
				this.splice(props.length)
			}
			//remove those props didn't get too
			if ( collectingStarted ) {
				sendCollection()
			}
		}
	}),


		// create push, pop, shift, and unshift
		// converts to an array of arguments 
		getArgs = function( args ) {
			if ( args[0] && (Can.isArray(args[0])) ) {
				return args[0]
			}
			else {
				return Can.makeArray(args)
			}
		};
	// describes the method and where items should be added
	Can.each({
		/**
		 * @function push
		 * Add items to the end of the list.
		 * 
		 *     var l = new Can.Observe.List([]);
		 *     
		 *     l.bind('change', function( 
		 *         ev,        // the change event
		 *         attr,      // the attr that was changed, for multiple items, "*" is used 
		 *         how,       // "add"
		 *         newVals,   // an array of new values pushed
		 *         oldVals,   // undefined
		 *         where      // the location where these items where added
		 *         ) {
		 *     
		 *     })
		 *     
		 *     l.push('0','1','2');
		 * 
		 * @return {Number} the number of items in the array
		 */
		push: "length",
		/**
		 * @function unshift
		 * Add items to the start of the list.  This is very similar to
		 * [Can.Observe.prototype.push].
		 */
		unshift: 0
	},
	// adds a method where
	// - name - method name
	// - where - where items in the array should be added


	function( name, where ) {
		list.prototype[name] = function() {
			// get the items being added
			var args = getArgs(arguments),
				// where we are going to add items
				len = where ? this.length : 0;

			// go through and convert anything to an observe that needs to be converted
			for ( var i = 0; i < args.length; i++ ) {
				var val = args[i];
				if ( canMakeObserve(val) ) {
					args[i] = hookupBubble(val, "*", this)
				}
			}
			
			// if we have a sort item, add that
			if( args.length == 1 && this.comparator ) {
				// add each item ...
				// we could make this check if we are already adding in order
				// but that would be confusing ...
				var index = this.sortedIndex(args[0]);
				this.splice(index, 0, args[0]);
				return this.length;
			}
			
			// call the original method
			var res = [][name].apply(this, args)
			
			// cause the change where the args are:
			// len - where the additions happened
			// add - items added
			// args - the items added
			// undefined - the old value
			if ( this.comparator  && args.length > 1) {
				this.sort(null, true);
				batchTrigger(this,"reset", [args])
			} else {
				batchTrigger(this, "change", [""+len, "add", args, undefined])
			}
			

			return res;
		}
	});

	Can.each({
		/**
		 * @function pop
		 * 
		 * Removes an item from the end of the list.
		 * 
		 *     var l = new Can.Observe.List([0,1,2]);
		 *     
		 *     l.bind('change', function( 
		 *         ev,        // the change event
		 *         attr,      // the attr that was changed, for multiple items, "*" is used 
		 *         how,       // "remove"
		 *         newVals,   // undefined
		 *         oldVals,   // 2
		 *         where      // the location where these items where added
		 *         ) {
		 *     
		 *     })
		 *     
		 *     l.pop();
		 * 
		 * @return {Object} the element at the end of the list
		 */
		pop: "length",
		/**
		 * @function shift
		 * Removes an item from the start of the list.  This is very similar to
		 * [Can.Observe.prototype.pop].
		 * 
		 * @return {Object} the element at the start of the list
		 */
		shift: 0
	},
	// creates a 'remove' type method


	function( name, where ) {
		list.prototype[name] = function() {
			
			var args = getArgs(arguments),
				len = where && this.length ? this.length - 1 : 0;


			var res = [][name].apply(this, args)

			// create a change where the args are
			// "*" - change on potentially multiple properties
			// "remove" - items removed
			// undefined - the new values (there are none)
			// res - the old, removed values (should these be unbound)
			// len - where these items were removed
			batchTrigger(this, "change", [""+len, "remove", undefined, [res]])

			if ( res && res.unbind ) {
				res.unbind("change" + this._namespace)
			}
			return res;
		}
	});
	
	list.prototype.
	/**
	 * @function indexOf
	 * Returns the position of the item in the array.  Returns -1 if the
	 * item is not in the array.
	 * @param {Object} item
	 * @return {Number}
	 */
	indexOf = [].indexOf || function(item){
		return Can.inArray(item, this)
	};
}