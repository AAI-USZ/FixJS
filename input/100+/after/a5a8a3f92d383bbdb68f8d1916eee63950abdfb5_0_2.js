function ( context, undefined ) {

"use strict";

var $ = context.PB,
	routeStrip = /(:?)(\!?)(\*?)([a-z0-9_-]+)(\[.*?\])*([\/\.|]*)/ig,
	pbMvc = {};

pbMvc.Request = PB.Class({

	prefix: 'http_',

	cache: {},

	hash: null,

	/**
	 *
	 */
	construct: function () {

		if( 'onhashchange' in window ) {

			PB(window).on('hashchange', this.execute.bind(this));
		} else {

			setInterval( this.hashCheck.bind(this), 250 );
		}
	},

	/**
	 *
	 */
	execute: function ( url, params ) {

		if( !PB.is('String', url) ) {

			url = window.location.hash;
		}

		params = PB.extend( this.matchRoute( url ), params );

		if( !params ) {

			console.log('Request did not match any route');
			return;
		}

		var action = this.prefix+params.action,
			controllerName = params.controller,
			controller,
			proto;

		if( !pbMvc.Controller[controllerName] ) {

			throw Error( '`'+controllerName+'` not found' );
			return;
		}

		proto = pbMvc.Controller[controllerName].prototype;

		if( !proto[action] ) {

			throw Error( '`'+action+'` not found in `'+controller+'`' );
			return;
		}

		controller = this.cache[controllerName];

		if( !controller ) {

			controller = this.cache[controllerName] = new pbMvc.Controller[controllerName];
		}

		if( PB.is('Function', proto.before) ) {

			controller.before( params );
		}

		controller[action]( params );

		if( PB.is('Function', proto.after) ) {

			controller.after( params );
		}

		return this;
	},

	/**
	 * Return te matches route or null if none matched
	 *
	 * @param string
	 * @param object route parts
	 */
	matchRoute: function ( url ) {

		var parts;

		url = url.trimLeft('#');
		url = url.trim('/');
		url = url.replace(/\/\/+/, '/');

		PB.each(pbMvc.Route.all(), function ( key, _route ) {

			if( parts = _route.matches( url ) ) {

				return true;
			}

			parts = null;
		});

		return parts;
	},

	/**
	 * Fallback 'event' for older browsers
	 */
	hashCheck: function () {

		if( window.location.hash !== this.hash ) {

			this.hash = window.location.hash;

			this.execute();
		}
	}
});
/**
 *
 */
pbMvc.Route = PB.Class({

	construct: function ( name, regex, extract ) {

		this._name = name;
		this._regex = regex;
		this._extract = extract;

		this._defaults = null;
	},

	defaults: function ( defaults ) {

		this._defaults = PB.overwrite({}, defaults);
	},

	matches: function ( uri ) {

		var match = uri.match( this._regex ),
			params = PB.overwrite({}, this._defaults || {});	// Clone defaults

		if( !match ) {

			return false;
		}

		match.shift();

		for( var i = 0; i < match.length; i++ ) {

			if( match[i] && this._extract[i] ) {

				params[this._extract[i]] = match[i];
			}
		}

		return params;
	}
});

PB.extend(pbMvc.Route, {

	routes: {},

	/**
	 * Return all set routes
	 */
	all: function () {

		return pbMvc.Route.routes;
	},

	/**
	 * @param string
	 * @param regexp
	 * @param array
	 */
	set: function ( name, route ) {

		if( pbMvc.Route.routes[name] ) {

			throw Error('Already declared route::'+name);
		}

		var parsed = parseString(route);

		console.log( parsed.regexp );

		parsed.regexp = new RegExp( parsed.regexp, 'i' );

		return pbMvc.Route.routes[name] = new pbMvc.Route( name, parsed.regexp, parsed.properties );
	}
});

function parseString ( route ) {

	var properties = [],
		regexp = '^';

	route.replace(routeStrip, function ( match, isGroup, isRequired, isWildcard, name, customMatching, seperator ) {

		regexp += '(';

		if( isGroup ) {

			properties.push( name );

			if( isWildcard && !customMatching ) {

				regexp += '.*';
			} else {

				regexp += customMatching ? customMatching : '[a-z0-9_-]';
				regexp += isRequired ? '+' : '*';
			}

		} else {

			properties.push( false );

			regexp += name;
		}

		regexp += ')';

		if( !isGroup ) {

			regexp += '+';
		}

		if( seperator ) {

			regexp += seperator;
			regexp += isRequired ? '+' : '*';
		}
	});

	return {

		regexp: regexp,
		properties: properties
	};
}


PB.extend(pbMvc.Route, {


	history: function( check ){

		if( check ) {

			this.journey = [];

			PB(document).on('click', function ( e ) {

				var el = $(e.target);

				if ( el.nodeName === 'A' ) {

					e.stop();

					this.journey.push( [ window.location.hash, el ] );

					window.location = el.attr('href');

				}

			}.bind(this));

		}

		return ( function() {

				return this.journey;

		}.bind(this)());
	}

});

pbMvc.Model = PB.Class(PB.Observer, {

	name: null,

	url: '/{name}/rest/{id}.json?recursive=1',

	data: null,

	previousData: null,

	_settingData: false,

	construct: function ( id ) {

		if( !this.name ) {

			return this.error('Model.name required');
		}

		this.parent();

		this.data = {};
		this.previousData = {};

		if( id !== undefined ) {

			this.set('id', id)
				.fetch();
		}
	},

	set: function ( key, value ) {

		var previousValue = this.data[key];

		if( previousValue === value ) {

			return this;
		}

	/*	if( this.properties && this.properties[key] && this.properties[key].set ) {

			value = this.properties[key].set.call( this, value, this.data[key] );
		}*/

		this.data[key] = value;

		if( !this._settingData ) {

			this.emit('change', this);
		}

		this.emit('change:'+key, this, key);

		return this;
	},

	setData: function ( data ) {

		this._settingData = true;

		PB.each(data, this.set, this);

		this._settingData = false;

		this.emit('change', this);

		return this;
	},

	/**
	 * Retrieve entry or all data
	 *
	 * @param string
	 * @return mixed
	 */
	get: function ( key ) {

		var value = this.data[key];

		if( value === undefined || value === null ) {

			return null;
		}

/*		if( this.properties && this.properties[key] && this.properties[key].get ) {

			value = this.properties[key].get.call( this, value );
		}*/

		return value;
	},

	getData: function () {

		return PB.overwrite({}, this.data);
	},

	isset: function ( key ) {

		return this.data[key] !== undefined;
	},

	unset: function ( key ) {

		this.data[key] = void 0;

		return this;
	},

	isValid: function () {


	},

	error: function ( message ) {

		console.log('Silent fail :) -> ', message);
	},

	getUrl: function () {

		return this.url
			.replace('{name}', this.name)
			.replace('{id}', this.get('id') || '');
	},

	/**
	 * Depricated -> removing explecite model declaration
	 */
/*	getRESTData: function () {

		var data = {};

		PB.each(this.data, function ( key, value ) {

			if( key in this.model ) {

				switch ( this.model[key].type ) {

					case 'date':
						break;
				}

				data[key] = value;
			}
		}, this);

		return data;
	},*/

	fetch: function () {

		if( !this.get('id') ) {

			return this.error('Failed to fetch `'+this.name+'`, no id set!');
		}

		(new PB.Request({

			url: this.getUrl(),
			async: false
		})).on('end', function ( t, status ){

			switch ( status ) {

				case 200:
					if( !t.responseJSON ) {

						this.error('No valid JSON response');
					}

					this.setData( t.responseJSON );
					break;

				default:
					this.error('Error in fetching `Model '+this.name+'`');
					break;
			}
		}, this).send();

		return this;
	},

	save: function () {

		(new PB.Request({

			url: this.getUrl(),
			method: this.get('id') ? 'PUT' : 'POST',
			data: {

				__data: JSON.stringify(this.data)
			}
		})).on('end', this.crudCallback, this).send();
	},

	remove: function () {

		if( !this.get('id') ) {

			return;
		}

		(new PB.Request({

			url: this.getUrl(),
			method: 'DELETE'
		})).on('end', this.crudCallback, this).send();
	},


	crudCallback: function ( t, status ) {

		switch ( status ) {

			case 200:
			case 201:
				if( !t.responseJSON ) {

					return this.error('No valid JSON response');
				}

				this.setData( t.responseJSON );
				break;

			case 401:
				return this.error('Unauthorized');
				break;

			case 405:
				return this.error('Method Not Allowed');
				break;

			default:
				return this.error('CRUD error: `'+status+'`');
				break;
		}
	}
});

/**
 *
 */
pbMvc.View = PB.Class({

	/**
	 *
	 */
	construct: function ( filename, expire ) {

		this.filename = filename;
		this.expire = expire;
	},

	/**
	 *
	 */
	render: function () {

		return PB.App.View.fetch( this.filename, this.expire );
	}
});

PB.overwrite(pbMvc.View, {

	version: 'VERSION',

	cache: {},

	expire: 3600,

	/**
	 * Loads the given view synchrone
	 *
	 * @param string
	 * @return string
	 */
	fetch: function ( url, expire ) {

		if( pbMvc.View.cache[url] && pbMvc.View.cache[url].expire > Date.now() ) {

			return pbMvc.View.cache[url].text;
		}

		var request = new PB.Request({

				url: url,
				async: false,
				data: {

					ac: pbMvc.View.version
				}
			});

		pbMvc.View.cache[url] = {

			expire: Date.now() + (expire === undefined ? pbMvc.View.expire*1000 : expire)
		};

		request.on('end', function ( t, code ) {

			switch( code ) {

				case 404:
					throw new Error('View file `'+url+'` not found');
					break;

				case 200:
					pbMvc.View.cache[url].text = t.responseText;
					break;

				default:
					throw new Error('Response didn`t return a valid code, returned '+code);
			}
		}).send();

		if( !pbMvc.View.collecting ) {

			setInterval(pbMvc.View.collectGarbage, 30000);
		}

		return pbMvc.View.cache[url].text;
	},

	/**
	 * Checks whether entry is expired and removes the entry
	 * This method should only be called internally
	 */
	collectGarbage: function () {

		var now = Date.now();

		PB.each(pbMvc.View.cache, function ( url, data ) {

			if( data.expire > now ) {

				delete pbMvc.View.cache[url];
			}
		});
	}
});
/**
 * Abstract controller is based on Pluxbox, rewrite for own purpose
 */
pbMvc.Controller = PB.Class({});

/**
 * Init MVC when all files are loaded
 */
$(window).once('load', function () {

	(new PB.App.Request())
		.execute();
});

return $.App = pbMvc;
}