function() {
	function quote( str ) {
		return '"' + str.toString().replace( /"/g, '\\"' ) + '"';
	}
	function literal( o ) {
		return o + "";
	}
	function join( pre, arr, post ) {
		var s = jsDump.separator(),
			base = jsDump.indent(),
			inner = jsDump.indent(1);
		if ( arr.join ) {
			arr = arr.join( "," + s + inner );
		}
		if ( !arr ) {
			return pre + post;
		}
		return [ pre, inner + arr, base + post ].join(s);
	}
	function array( arr, stack ) {
		var i = arr.length, ret = new Array(i);
		this.up();
		while ( i-- ) {
			ret[i] = this.parse( arr[i] , undefined , stack);
		}
		this.down();
		return join( "[", ret, "]" );
	}

	var reName = /^function (\w+)/,
		jsDump = {
			parse: function( obj, type, stack ) { //type is used mostly internally, you can fix a (custom)type in advance
				stack = stack || [ ];
				var inStack, res,
					parser = this.parsers[ type || this.typeOf(obj) ];

				type = typeof parser;
				inStack = inArray( obj, stack );

				if ( inStack != -1 ) {
					return "recursion(" + (inStack - stack.length) + ")";
				}
				//else
				if ( type == "function" )  {
					stack.push( obj );
					res = parser.call( this, obj, stack );
					stack.pop();
					return res;
				}
				// else
				return ( type == "string" ) ? parser : this.parsers.error;
			},
			typeOf: function( obj ) {
				var type;
				if ( obj === null ) {
					type = "null";
				} else if ( typeof obj === "undefined" ) {
					type = "undefined";
				} else if ( QUnit.is( "regexp", obj) ) {
					type = "regexp";
				} else if ( QUnit.is( "date", obj) ) {
					type = "date";
				} else if ( QUnit.is( "function", obj) ) {
					type = "function";
				} else if ( typeof obj.setInterval !== undefined && typeof obj.document !== "undefined" && typeof obj.nodeType === "undefined" ) {
					type = "window";
				} else if ( obj.nodeType === 9 ) {
					type = "document";
				} else if ( obj.nodeType ) {
					type = "node";
				} else if (
					// native arrays
					toString.call( obj ) === "[object Array]" ||
					// NodeList objects
					( typeof obj.length === "number" && typeof obj.item !== "undefined" && ( obj.length ? obj.item(0) === obj[0] : ( obj.item( 0 ) === null && typeof obj[0] === "undefined" ) ) )
				) {
					type = "array";
				} else {
					type = typeof obj;
				}
				return type;
			},
			separator: function() {
				return this.multiline ?	this.HTML ? "<br />" : "\n" : this.HTML ? "&nbsp;" : " ";
			},
			indent: function( extra ) {// extra can be a number, shortcut for increasing-calling-decreasing
				if ( !this.multiline ) {
					return "";
				}
				var chr = this.indentChar;
				if ( this.HTML ) {
					chr = chr.replace( /\t/g, "   " ).replace( / /g, "&nbsp;" );
				}
				return new Array( this._depth_ + (extra||0) ).join(chr);
			},
			up: function( a ) {
				this._depth_ += a || 1;
			},
			down: function( a ) {
				this._depth_ -= a || 1;
			},
			setParser: function( name, parser ) {
				this.parsers[name] = parser;
			},
			// The next 3 are exposed so you can use them
			quote: quote,
			literal: literal,
			join: join,
			//
			_depth_: 1,
			// This is the list of parsers, to modify them, use jsDump.setParser
			parsers: {
				window: "[Window]",
				document: "[Document]",
				error: "[ERROR]", //when no parser is found, shouldn"t happen
				unknown: "[Unknown]",
				"null": "null",
				"undefined": "undefined",
				"function": function( fn ) {
					var ret = "function",
						name = "name" in fn ? fn.name : (reName.exec(fn) || [])[1];//functions never have name in IE

					if ( name ) {
						ret += " " + name;
					}
					ret += "( ";

					ret = [ ret, QUnit.jsDump.parse( fn, "functionArgs" ), "){" ].join( "" );
					return join( ret, QUnit.jsDump.parse(fn,"functionCode" ), "}" );
				},
				array: array,
				nodelist: array,
				"arguments": array,
				object: function( map, stack ) {
					var ret = [ ], keys, key, val, i;
					QUnit.jsDump.up();
					if ( Object.keys ) {
						keys = Object.keys( map );
					} else {
						keys = [];
						for ( key in map ) {
							keys.push( key );
						}
					}
					keys.sort();
					for ( i = 0; i < keys.length; i++ ) {
						key = keys[ i ];
						val = map[ key ];
						ret.push( QUnit.jsDump.parse( key, "key" ) + ": " + QUnit.jsDump.parse( val, undefined, stack ) );
					}
					QUnit.jsDump.down();
					return join( "{", ret, "}" );
				},
				node: function( node ) {
					var a, val,
						open = QUnit.jsDump.HTML ? "&lt;" : "<",
						close = QUnit.jsDump.HTML ? "&gt;" : ">",
						tag = node.nodeName.toLowerCase(),
						ret = open + tag;

					for ( a in QUnit.jsDump.DOMAttrs ) {
						val = node[ QUnit.jsDump.DOMAttrs[a] ];
						if ( val ) {
							ret += " " + a + "=" + QUnit.jsDump.parse( val, "attribute" );
						}
					}
					return ret + close + open + "/" + tag + close;
				},
				functionArgs: function( fn ) {//function calls it internally, it's the arguments part of the function
					var args,
						l = fn.length;

					if ( !l ) {
						return "";
					}

					args = new Array(l);
					while ( l-- ) {
						args[l] = String.fromCharCode(97+l);//97 is 'a'
					}
					return " " + args.join( ", " ) + " ";
				},
				key: quote, //object calls it internally, the key part of an item in a map
				functionCode: "[code]", //function calls it internally, it's the content of the function
				attribute: quote, //node calls it internally, it's an html attribute value
				string: quote,
				date: quote,
				regexp: literal, //regex
				number: literal,
				"boolean": literal
			},
			DOMAttrs: {
				//attributes to dump from nodes, name=>realName
				id: "id",
				name: "name",
				"class": "className"
			},
			HTML: false,//if true, entities are escaped ( <, >, \t, space and \n )
			indentChar: "  ",//indentation unit
			multiline: true //if true, items in a collection, are separated by a \n, else just a space.
		};

	return jsDump;
}