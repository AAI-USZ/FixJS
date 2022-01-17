function( url, stealData, cb, depth, includeFns ) {
		// save and remove the old steal
		var oldSteal = window.steal || steal,
			// new steal is the steal opened
			newSteal;
			
		// remove the current steal
		delete window.steal;
		
		// clean up window in case this is the second time Envjs has opened the page
		for(var n in window){
			// TODO make this part of steal namespace
			if(n !== "STEALPRINT"){
				delete window[n];
			}
		}
		// move params
		if ( typeof stealData == 'object') {
			window.steal = stealData;
		}else{
			cb = stealData;
		}
		// get envjs
		load('steal/rhino/env.js'); //reload every time
		
		
	
		// what gets called by steal.done
		// rootSteal the 'master' steal
		var doneCb = function(rootSteal){
			// get the 'base' steal (what was stolen)
			
			// clear timers
			Envjs.clear();
			
			// callback with the following
			cb({
				/**
				 * @hide
				 * Goes through each steal and gives its content.
				 * How will this work with packages?
				 * 
				 * @param {Function} [filter] the tag to get
				 * @param {Boolean} [depth] the tag to get
				 * @param {Object} func a function to call back with the element and its content
				 */
				each: function( filter, depth, func ) {
					// reset touched
					touched = {};
					// move params
					if ( !func ) {
						
						if( depth === undefined ) {
							depth = false;
							func = filter;
							filter = function(){return true;};
						} else if( typeof filter == 'boolean'){
							func = depth;
							depth = filter
							filter = function(){return true;};
						} else if(arguments.length == 2 && typeof filter == 'function' && typeof depth == 'boolean'){
							func = filter;
							filter = function(){return true;};
						} else {  // filter given, no depth
							func = depth;
							depth = false;
							
						}
					};
					
					// make this filter by type
					if(typeof filter == 'string'){
						var resource = filter;
						filter = function(stl){
							return stl.options.buildType === resource;
						}
					}
					var items = [];
					// iterate 
					
					iterate(rootSteal, function(stealer){
						
						if( filter(stealer) ) {
							stealer.options.text = stealer.options.text || loadScriptText(stealer.options);
							func(stealer.options, stealer );
							items.push(stealer.options);
						}
					}, depth, includeFns );
				},
				// the 
				steal: newSteal,
				url: url,
				rootSteal : rootSteal,
				firstSteal : s.build.open.firstSteal(rootSteal)
			})
		};
		
		Envjs(url, {
			scriptTypes: {
				"text/javascript": true,
				"text/envjs": true,
				"": true
			},
			fireLoad: true,
			logLevel: 2,
			afterScriptLoad: {
				// prevent $(document).ready from being called even though load is fired
				"jquery.js": function( script ) {
					window.jQuery && jQuery.readyWait++;
				},
				"steal.js": function(script){
					// a flag to tell steal we're in "build" mode
					// this is used to completely ignore files with the "ignore" flag set
					window.steal.isBuilding = true;
					// if there's timers (like in less) we'll never reach next line 
					// unless we bind to done here and kill timers
					window.steal.one('done', doneCb);
					newSteal = window.steal;
				}
			},
			dontPrintUserAgent: true
		});
		
		// set back steal
		
		window.steal = oldSteal;
		// TODO: is this needed anymore
		window.steal._steal = newSteal;

		Envjs.wait();
	}