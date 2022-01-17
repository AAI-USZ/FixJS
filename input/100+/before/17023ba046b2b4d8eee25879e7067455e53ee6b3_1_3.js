f	var A = Array[P], D = Date[P], F = Function[P], N = Number[P], O = Object[P], S = String[P]
	  , p2 = function(n){return n>9?n:"0"+n}
	  , p3 = function(n){return (n>99?n:(n>9?"0":"00")+n)}
	  , jsonMap = {"\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t",'"':'\\"',"\\":"\\\\"}
	  , I = function(o, n, s, x) {if (!(n in o)) o[n] = new Function("x","y","return function(a,b,c,d){"+s+"}").apply(null, x||[o, n])}
	  , a, b, c; // Reusable

	/*@cc_on
		// HTML5 elements suport for IE should be in head before stylesheets
		// "address article aside canvas details figcaption figure footer header hgroup menu nav section summary command datalist mark meter time wbr".replace(/\w+/g, function(t){d.createElement(t)});

		// XMLHttpRequest was unsupported in IE 5.x-6.x + remove background image flickers on hover
		I(w, "XMLHttpRequest", "a=function(n){n='Msxml2.XMLHTTP'+n;try{x[y]=function(){return new ActiveXObject(n)};return new x[y]}catch(e){}};return a('.6.0')||a('')");
		try{d.execCommand('BackgroundImageCache',false,true)}catch(e){};
	@*/


	/** hasOwnProperty
	// hasOwnProperty was unsupported in Safari/WebKit until 2.0.2
	I(O, "hasOwnProperty", "try{b=this.constructor;while(b=b[x])if(b[a]===this[a])return false}catch(e){}return true", [P]);
	//*/

	/* ECMAScript 5 stuff */

	a = Array;

	I(a, "slice"  , "return x.apply(y,arguments)", [F.call, A.slice]);
	I(a, "isArray", "return x.call(a)=='[object Array]'", [O.toString]);
	// Non-standard
	I(a, "from"   , "for(b=[],c=a.length;c--;b.unshift(a[c]));return b");

	a = Object;
	I(a, "create" , "x[y]=a;return new x", [function(){}, P]);
	I(a, "keys"   , "c=[];for(b in a)a.hasOwnProperty(b)&&c.push(b);return c");
	// Non-standard
	I(a, "each"   , "for(d in a)a.hasOwnProperty(d)&&b.call(c,a[d],d,a)");
	
	a = "var t=this,l=t.length,o=[],i=-1;";
	c = "if(t[i]===a)return i;return -1";

	I(A, "indexOf",     a+"i+=b|0;while(++i<l)"+c);
	I(A, "lastIndexOf", a+"i=(b|0)||l;i>--l&&(i=l)||i<0&&(i+=l);++i;while(--i>-1)"+c);

	b = a+"if(arguments.length<2)b=t";
	c = "b=a.call(null,b,t[i],i,t);return b";
	I(A, "reduce",      b+"[++i];while(++i<l)"+c);
	I(A, "reduceRight", b+"[--l];i=l;while(i--)"+c);

	b = a+"while(++i<l)if(i in t)";
	I(A, "forEach",     b+"a.call(b,t[i],i,t)");
	I(A, "every",       b+"if(!a.call(b,t[i],i,t))return!1;return!0");

	c = ";return o";
	I(A, "map",         b+"o[i]=a.call(b,t[i],i,t)"+c);

	b += "if(a.call(b,t[i],i,t))";
	I(A, "filter",      b+"o.push(t[i])"+c);
	I(A, "some",        b+"return!0;return!1");

	// Non-standard
	I(A, "remove",   a+"o=x.call(arguments);while(l--)if(o.indexOf(t[l])>-1)t.splice(l,1);return t", [A.slice]);
	I(A, "indexFor", a+"i=b?0:l;while(i<l)b.call(c,a,t[o=(i+l)>>1])<0?l=o:i=o+1;return i");



	A.unique = function(){
  	//** lambda
		return "s i a -> i == a.lastIndexOf(s)".filter(this);
		/*/
		return this.filter(function(s, i, a){ return i == a.lastIndexOf(s); });
		//*/
	}
	/*
	Array.flatten = function(arr){
		for(var i=arr.length;i--;)
			Array.isArray(arr[i]) && A.splice.apply(arr, [i, 1].concat(Array.flatten(arr[i])));
		return arr
	};
	flat([1,2,[3,4,[5,6]],7]);
	*/

	
	//** Function extensions

	F.curry = function() {
		var t = this, a = Array.slice(arguments, 0);
		return a.length ? function() {return t.apply(this, a.concat(Array.slice(arguments, 0)));} : t;
	}

	S.trim = S.trim || S.replace.curry(/^[\s\r\n\u2028\u2029]+|[\s\r\n\u2028\u2029]+$/g, "");
	//"trim" in S || (S.trim = S.replace.curry(/^[\s\r\n\u2028\u2029]+|[\s\r\n\u2028\u2029]+$/g, ""));
	//I(S, "trim"   , "return this.replace(x,'')", [/^[\s\r\n\u2028\u2029]+|[\s\r\n\u2028\u2029]+$/g]);

	I(F, "bind"   , "var t=this;b=x.call(arguments,1);c=function(){return t.apply(this instanceof c?this:a,b.concat.apply(b,arguments))};c[y]=t[y];return c", [A.slice, P]);
	

	F.construct = function(a) {
		return new(F.bind.apply(this, A.concat.apply([null], a)));
	}  

	F.clone = function() {
		var a = this.toString().match(/\((.*)\)\s*{([\s\S]*)}$/);
		return new Function(a[1].split(/[, ]+/), a[2]);
	}

	// Run function once and return cached value or cached instance
	F.cache = function(instance, keyFn, cache) {
		var t = this, c = cache || {}, f = function() {
			var a = arguments
			  , i = !!instance || this instanceof f
			  , k = keyFn ? keyFn(a, t) : i + ":" + a.length + ":" + A.join.call(a);

			return k in c ? c[k] : (c[k] = i ? t.construct(a) : t.apply(this, a));
		}
		f.origin = t;
		f.cached = c;
		f.extend = function(){
			return t.extend.apply(t, arguments).cache(instance, keyFn, c);
		}
		f[P] = t[P]; // prototype for better access on extending 
		return f;
	}

	F.extend = function() {
		var t = this, f = t.clone(), i = 0, e;
		f[P] = Object.create(t[P]);
		while (e = arguments[i++]) for (t in e) if (e.hasOwnProperty(t)) f[P][t] = e[t];
		return f;
	}
	
	F.guard = function(guard, otherwise) {
		var t = this
		  , f = guard.fn()
		  , o = (otherwise||function(){}).fn();

		return function() {
			return (f.apply(this, arguments) ? t : o).apply(this, arguments);
		}
	}

	F.byWords = function(i) {
		var t = this;
		i |= 0;
		return function() {
			var s = this, a = arguments, r;
			a[i].replace(/\w+/g, function(w){a[i]=w;r=t.apply(s, a)});
			return r;
		}
	}

	/* THANKS: Oliver Steele - String lambdas [http://osteele.com/javascripts/functional]
	 *
	 * Copyright: Copyright 2007 by Oliver Steele.  All rights reserved.
	 * License: MIT License
	 * Homepage: http://osteele.com/javascripts/functional
	 * Created: 2007-07-11
	 * Version: 1.0.2
	 *
	 * Modified by Lauri Rooden */

	var lambda = function(s) {
		var a = []
			, t = s.split("->");
		
		if (t.length > 1) {
			while (t.length) {
				s = t.pop();
				a = t.pop().trim().split(/[\s,]+/m);
				t.length && t.push("(function("+a+"){return ("+s+")})");
			}
		} else {
			// test whether an operator appears on the left (or right), respectively
			if (t = s.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=)/)) {
				a.push("$1");
				s = "$1" + s;
			}
			// test whether an operator appears on the right
			if (s.match(/[+\-*\/%&|\^\.=<>!]\s*$/)) {
				a.push("$2");
				s += "$2";
			} else if (!t) {
				// `replace` removes symbols that are capitalized, follow '.',
				// precede ':', are 'this' or 'arguments'; and also the insides of
				// strings (by a crude test).  `match` extracts the remaining
				// symbols.
				a = a.concat( s.replace(/'([^'\\]|\\.)*'|"([^"\\]|\\.)*"|this|arguments|\.\w+|\w+:/g, "").match(/\b[a-z_]\w*/g) ).unique();
			}
		}
		return new Function(a, "return(" + s + ")");
	}.cache();

	S.fn = function(){
		return lambda(this);
	}

	F.fn = function() {
		return this;
	}

	!function(n){
		F[n] = S[n] = function(){
			var t = this, a = arguments, arr = a[0]
			a[0] = t.fn();
			return A[n].apply(arr, a);
		}
	}.byWords()("every filter forEach map reduce reduceRight some");
	
	F.each = S.each = F.forEach;
	F.foldl = S.foldl = F.reduce;
	F.foldr = S.foldr = F.reduceRight;
	F.select = S.select = F.filter;
	




	F.compose = function(fn) {
		var t = this;
		return function() {
			return t.call(this, fn.apply(this, arguments));
		}
	}

	F.chain = function(f) {
		var t = this;
		return function() {
			var s = this
			  , a = arguments;

			t.apply(s, a);
			return f.apply(s, a);
		}
	}

	F.flip = function() {
		var t = this;
		return function() {
			var a = arguments, b = a[0];
			a[0] = a[1]
			a[1] = b
			return t.apply(this, a);
		}
	}

	F.byKeyValue = function() {
		var t = this;
		return function(o) {
			var s = this, a = arguments, r;
			if (typeof o == "object") Object.each(o, function(v, k){
				a[0] = k;
				a[1] = v;
				r = t.apply(s, a);
			})
			else r = t.apply(s, a);
			return r;
		}
	}


	// Time to live - Run *fun* if Function not called on time
	F.ttl = function(ms, fun) {
		var t = this, s = setTimeout(function(){ms=0;fun&&fun()}, ms);
		return function() {
			clearTimeout(s);
			ms && t.apply(null, arguments);
		}
	}

	// Run Function once after last call
	F.once = function(ms) {
		var t = this, s, args;
		return function() {
			clearTimeout(s);
			args = arguments;
			s = setTimeout(function(){t.apply(null, args)}, ms);
		}
	}

	// Maximum call rate for Function
	F.rate = function(ms) {
		var t = this, n = 0;
		return function() {
			var d = +new Date();
			if (d > n) {
				n = d + ms;
				t.apply(null, arguments);
			}
		}
	}
	//*/

	/**
	 * Returns a function identical to this function except that
	 * it prints its arguments on entry and its return value on exit.
	 * This is useful for debugging function-level programs.
	 */
	
	/** debug.trace
	F.trace = function(n) {
		var t = this;
		n = n || t;
		return "console" in w ?
			function() {
				console.info('[', n, 'apply(', this!=w && this, ',', arguments, ')');
				var result = t.apply(this, arguments);
				console.info(']', n, ' -> ', result);
				return result;
			} :
			t;
	}
	//*/


	//** String extensions

	S.format = function() {
		var a = arguments;
		return this.replace(/\{(\d+)\}/g, function(_, i){return a[i]});
	}

  S.safe = function() {
  	return this
  		.replace(/&/g, "&amp;")
  		.replace(/</g, "&lt;")
  		.replace(/>/g, "&gt;")
  		.replace(/\"/g, "&quot;");
	}

	//S.camelCase = function() { return this.replace(/[ _-]+([a-z])/g,function(_, a){return a.toUpperCase()}); }
	S.camelCase = S.replace.curry(/[ _-]+([a-z])/g, function(_, a){return a.toUpperCase()});

  S.toAccuracy = N.toAccuracy = function(a) {
    var x = (""+a).split("."), n = ~~((this/a)+.5) * a;
    return ""+(1 in x ? n.toFixed(x[1].length) : n);
  }
	//*/


	//** String.utf8

  S.utf8_encode = function() {
    return unescape( encodeURIComponent( this ) );
  }

  S.utf8_decode = function() {
    return decodeURIComponent( escape( this ) );
  }
	//*/


  //** IP helpers

  S.ip2int = function() {
  	var t = (this+".0.0.0").split(".");
  	return ((t[0] << 24) | (t[1] << 16) | (t[2] << 8 ) | (t[3]))>>>0;
  }

  S.int2ip = N.int2ip = function() {
  	var t = this;
  	return [t>>>24, (t>>>16)&0xFF, (t>>>8)&0xFF, t&0xFF].join(".");
  }
	//*/


	//** Date.format

	D.format = function(_) {
		var t = this
		  , x = D.format.masks[_] || _ || D.format.masks["default"]
		  , g = "get" + (x.slice(0,4) == "UTC:" ? (x=x.slice(4), "UTC"):"")
		  , y = g + "FullYear"
		  , m = g + "Month"
		  , d = g + "Date"
		  , w = g + "Day"
		  , h = g + "Hours"
		  , M = g + "Minutes"
		  , s = g + "Seconds"
		  , S = g + "Milliseconds";

		return x.replace(/(")([^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|(yy(yy)?|m{1,4}|d{1,4}|([HhMsS])\5?|[uUaAZ])/g,
			function(a, b, c) {
				return a == "yy"   ? (""+t[y]()).slice(2)
				     : a == "yyyy" ? t[y]()
				     : a == "m"    ? t[m]()+1
				     : a == "mm"   ? p2(t[m]()+1)
				     : a == "mmm"  ? D.monthNames[ t[m]() ]
				     : a == "mmmm" ? D.monthNames[ t[m]()+12 ]
				     : a == "d"    ? t[d]()
				     : a == "dd"   ? p2(t[d]())
				     : a == "ddd"  ? D.dayNames[ t[w]() ]
				     : a == "dddd" ? D.dayNames[ t[w]()+7 ]
				     : a == "h"    ? (""+t[h]()%12||12)
				     : a == "hh"   ? p2(t[h]()%12||12)
				     : a == "H"    ? t[h]()
				     : a == "HH"   ? p2(t[h]())
				     : a == "M"    ? t[M]()
				     : a == "MM"   ? p2(t[M]())
				     : a == "s"    ? t[s]()
				     : a == "ss"   ? p2(t[s]())
				     : a == "S"    ? t[S]()
				     : a == "SS"   ? p3(t[S]())
				     : a == "u"    ? (""+(t/1000)>>>0)
				     : a == "U"    ? +t
				     : a == "a"    ? (t[h]() > 11 ? "pm" : "am")
				     : a == "A"    ? (t[h]() > 11 ? "PM" : "AM")
				     : a == "Z"    ? "GMT " + (-t.getTimezoneOffset()/60)
				     : b           ? c
				     : a;
			}
		)
	}

	D.format.masks = {"default":"ddd mmm dd yyyy HH:MM:ss","isoUtcDateTime":'UTC:yyyy-mm-dd"T"HH:MM:ss"Z"'};
	D.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec January February March April May June July August September October November December".split(" ");
	D.dayNames = "Sun Mon Tue Wed Thu Fri Sat Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");

	I(D, "toISOString", "return this.format('isoUtcDateTime')");
	/*/
	I(D, "toISOString", "var t=this;return t.getUTCFullYear()+'-'+p2(t.getUTCMonth()+1)+'-'+p2(t.getUTCDate())+'T'+p2(t.getUTCHours())+':'+p2(t.getUTCMinutes())+':'+p2(t.getUTCSeconds())+'.'+p3(t.getUTCMilliseconds())+'Z'")
	//*/
	

	//** Date helpers

	S.date = N.date = function(format) {
		var t = this, d = new Date(), m, n = +t || Date.parse(t) || ""+t;
		if (isNaN(n)) {
			// Big endian date, starting with the year, eg. 2011-01-31
			if (m = n.match(/(\d{4})-(\d{2})-(\d{2})/)) d.setFullYear(m[1], m[2]-1, m[3]);
			// Little endian date, starting with the day, eg. 31.01.2011
			else if (m = n.match(/(\d{2})\.(\d{2})\.(\d{4})/)) d.setFullYear(m[3], m[2]-1, m[1]);
			// Middle endian date, starting with the month, eg. 01/31/2011
			else if (m = n.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/)) d.setFullYear(m[3], m[1]-1, m[2]);
			// Time
			m = n.match(/(\d{1,2}):(\d{2}):?(\d{2})?\.?(\d{3})?/) || [0, 0, 0];
			if (n.match(/pm/i) && m[1] < 12) m[1]+=12;
			d.setHours(m[1], m[2], m[3]||0, m[4]||0);
			// Timezone
			n.indexOf("Z")>-1 && d.setTime(d-(d.getTimezoneOffset()*60000));
		} else d.setTime( (n<4294967296?n*1000:n) );
		return format?d.format(format):d;
	}
	//*/

	//** Date.daysInMonth
	D.daysInMonth = function() {
		//return 32-new Date(this.getFullYear(),this.getMonth(),32).getDate();
		return (new Date(this.getFullYear(),this.getMonth()+1,0)).getDate();
	}
	//*/

	//** Date.startOfWeek
	D.startOfWeek = function() {
		var t = this;
		return new Date(t.getFullYear(), t.getMonth(), t.getDate() - (t.getDay() || 7) +1);
	}
	//*/


	N.human = function(steps, units){
		
	}


	//** Date.pretty convert dates to human-readable

	D.prettySteps = [8640000, 2592000, 604800, 86400, 3600,   60,       1];
	D.prettyUnits = [         "month", "week", "day", "hour", "minute", "second"];
	
	D.prettyStrings={"default":"{0} {1} ago", "day":"Yesterday"};

	D.pretty = function(format, custom) {
		var d = (new Date() - this + 1) / 1000
		  , a = D.prettySteps
		  , i = a.length;

		if (d<a[0]) {
			while(d>a[--i]);d/=a[i+1];
			return ((a=custom||D.prettyStrings)[(i=D.prettyUnits[i]+(d<2?"":"s"))]||a["default"]).format(d|0, i);
		}
		// use guard here
		return this.format(format);
	}
	//*/




	"JSON" in w || eval("w.JSON={parse:function(t){return new Function('return('+t+')')()},stringify:function j_enc(o){if(o==null)return'null';if(o instanceof Date)return'\"'+o.toISOString()+'\"';var i,s=[],c;if(Array.isArray(o)){for(i=o.length;i--;s[i]=j_enc(o[i]));return'['+s.join(',')+']';}c=typeof o;if(c=='string'){for(i=o.length;c=o.charAt(--i);s[i]=jsonMap[c]||(c<' '?'\\\\u00'+((c=c.charCodeAt())|4)+(c%16).toString(16):c));return'\"'+s.join('')+'\"';}if(c=='object'){for(i in o)o.hasOwnProperty(i)&&s.push(j_enc(i)+':'+j_enc(o[i]));return'{'+s.join(',')+'}';}return''+o}}");


	//** Event handling
	//TODO:sync with Fn.Events

	var Event = w.Event || (w.Event={})
	  , fn_id = 0
	  , kbMaps = []

	function cacheEvent(el, type, fn, fix_fn) {
		var _e = el._e || (el._e={});
		type in _e || (_e[type]={});
		/*
		var hash = {};
		hash[fn] = 1;
		JavaScript converts fn to a string via .toString(), we use unique id instead of fn source as a key.
		*/
		return (_e[type][ fn._fn_id || (fn._fn_id = ++fn_id) ] = type == "mousewheel" ? function(e) {
				if (!e) e = w.event;
				var delta = "wheelDelta" in e ? e.wheelDelta/120 : -e.detail/3;
				delta != 0 && fn.call(el, e, delta);
			} 
			: fix_fn
		);
	};

	function uncacheEvent(el, type, fn) {
		var _e = el._e||{};
		if (type in _e && "_fn_id" in fn && fn._fn_id in _e[type]) {
			var _fn = _e[type][fn._fn_id];
			delete _e[type][fn._fn_id];
			return _fn;
		};
		return fn;
	};

	// The addEventListener method is supported in Internet Explorer from version 9.
	if ("addEventListener" in w) {
		Event.add = function(el, ev, fn) {
			var _fn = cacheEvent(el, ev, fn, fn);
			ev == "mousewheel" && el.addEventListener("DOMMouseScroll", _fn, false);
			el.addEventListener(ev, _fn, false);
			return Event;
		}
		Event.remove = function(el, ev, fn) {
			var _fn = uncacheEvent(el, ev, fn);
			ev == "mousewheel" && el.removeEventListener("DOMMouseScroll", _fn, false);
			el.removeEventListener(ev, _fn, false);
			return Event;
		}
	} else {
		Event.add = function(el, ev, fn) {
			// In IE the event handling function is referenced, not copied, so 
			// the this keyword always refers to the window and is completely useless.
			el.attachEvent("on"+ev, cacheEvent(el, ev, fn, function(){fn.call(el,w.event)}) );
			return Event;
		}
		Event.remove = function(el, ev, fn) {
			el.detachEvent("on"+ev, uncacheEvent(el, ev, fn) );
			return Event;
		}
	};
	Event.stop = function(e) {
		"stopPropagation" in e && e.stopPropagation();
		"preventDefault" in e && e.preventDefault();
		e.cancelBubble = e.cancel = true;
		return e.returnValue = false;
	};

	Event.removeAll = function(el, ev) {
		var _e = el._e||{};
		for (var t in _e)
		/** hasOwnProperty
		if (_e.hasOwnProperty(t))
		//*/
		if (!ev || ev == t) {
			var fnList = _e[t];
			for (var fn in fnList)
			/** hasOwnProperty
			if (fnList.hasOwnProperty(fn))
			//*/

			Event.remove(el, t, fnList[fn]);
			delete _e[t];
		}
	};


	// http://www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html

	Event.pointerX = function(e) {
		if ("changedTouches" in e) e = e.changedTouches[0];
		return e.pageX || e.clientX + d.body.scrollLeft || 0;
	};
	Event.pointerY = function(e) {
		if ("changedTouches" in e) e = e.changedTouches[0];
		return e.pageY || e.clientY + d.body.scrollTop || 0;
	};
	Event.pointer = function(e) {
		var x = Event.pointerX(e), y = Event.pointerY(e);
		return { x: x, y: y, left: x, top: y };
	};

	function keyup(e) {
		var key = e.keyCode || e.which
		  , map = kbMaps[0];

		if ( key in map ) map[key](key);
		else if ( "num" in map && key > 47 && key < 58) map.num(key-48);
		else if ( "all" in map ) map.all(key);
		else {
			var i = 0;
			while ("bubble" in map && (map = kbMaps[++i])) {
				if ( key in map ) map[key](key);
				else if ( "all" in map ) map.all(key);
			}
		}
	}

	Event.setKeyMap = function(map) {
		kbMaps.unshift(map);
		kbMaps.length == 1 && Event.add(document, "keyup", keyup);
	}
	Event.removeKeyMap = function(map) {
		if (kbMaps.length > 0) {
			var index = kbMaps.indexOf(map);
			kbMaps.splice( index == -1 ? 0 : index, 1);
			kbMaps.length == 0 && Event.remove(document, "keyup", keyup);
		}
	}
	//*/


	//** Touch as mouse

	function touchHandler(e) {
		Event.stop(e);
		var touch = e.changedTouches[0], ev = d.createEvent("MouseEvent");
		ev.initMouseEvent(
			e.type.replace("touch", "mouse").replace("start", "down").replace("end", "up"),
			true, true, window, 1, 
			touch.screenX, touch.screenY, touch.clientX, touch.clientY,
			false, false, false, false, 0, null);
		touch.target.dispatchEvent(ev);
	};
	
	function touchStart(e) {
		if(e.touches.length == 1) {
			Event.add(d, "touchend", touchEnd)
				.add(d, "touchcancel", touchEnd)
				.add(d, "touchmove", touchHandler);
			touchHandler(e);
		}
	};
 
	function touchEnd(e) {
		Event.remove(d, "touchend", touchEnd)
			.remove(d, "touchcancel", touchEnd)
			.remove(d, "touchmove", touchHandler);
		touchHandler(e);
	};

	Event.touch_as_mouse = function(el) {
		Event.add(el, "touchstart", touchStart);
	};
	//*/



	//** Page builder

	var elCache = {}
	  , fnCache = {}
	  , dv = d.defaultView
	  , getStyle = ( dv && "getComputedStyle" in dv ?
	    	function(el, a) {
	    		return el.style[a] || dv.getComputedStyle(el,null)[a] || null;
	    	} :
	    	function(el, a) {
	    		if (a == "opacity") {
	    			var opacity = el.filters("alpha").opacity;
	    			return isNaN(opacity) ? 1 : (opacity?opacity/100:0);
	    		}
	    		a = a.camelCase();
	    		return el.style[a]||el.currentStyle[a]||null;
	    	}
	    )
	  , el_re = /([.#:])(\w+)/g
	  , El = function(n/*ame */, a/*rgs */) {
				var pre = {};
				n = n.replace(el_re, function(_, o, s) {
					pre[ o == "." ? (o = "class", (o in pre && (s = pre[o]+" "+s)), o) : o == "#" ? "id" : s ] = s;
					return "";
				}) || "div";

				var el = (elCache[n] || (elCache[n] = d.createElement(n))).cloneNode(true).set(pre);

				return n in fnCache && fnCache[n](el, a) || el.set(a);
			}
		, css_map = {float: "cssFloat"}

	function extend(e,p,k){
		if(e){
			if(!p)p=El[P];
			for(k in p)e[k]=p[k];
		}
		return e;
	}

	El.get = function(el) {
		if (typeof el == "string") el = d.getElementById(el);
		return "to" in el ? el : extend(el);
	}

	El.cache = function(n, el, custom) {
		elCache[n] = typeof el == "string" ? El(el) : el;
		if (custom) {
			fnCache[n] = custom;
		}
	}
	El.cache.el = elCache;
	El.cache.fn = fnCache;
	El.text = function(str){
		return d.createTextNode(str);
	}

	a = {
		/*
		e - element
		b - before
		*/
		append: function(e, b/*efore*/) {
			var t = this;
			if (e) {
				if (typeof e == "string" || typeof e == "number") e = El.text(e);
				else if ( !("nodeType" in e) && "length" in e ) {
					// document.createDocumentFragment is unsupported in IE5.5
					var len = e.length, i = 0, f = "createDocumentFragment" in d ? d.createDocumentFragment() : El("div");
					while (i<len) t.append.call(f, e[i++]);
					e = f;
				}

				if ("nodeType" in e) b ? t.insertBefore(e, b===true ? t.firstChild : b) : t.appendChild(e);
				//else "to" in e && e.to(t, b);
				"append_hook" in e && e.append_hook();
				//"child_hook" in t && t.child_hook();
			}
			return t;
		},

		after: function(e, b) {
			e.parentNode.append(this, b ? e : e.nextSibling);
			return this;
		},

		to: function(e, b) {
			e.append(this, b);
			return this;
		},

		hasClass: function(n) {
			return (" "+this.className+" ").indexOf(" "+n+" ") > -1;
		},

		addClass: function(n) {
			var t = this;
			t.className += t.className == "" ? n : t.hasClass(n) ? "" : " " + n;
			return t;
		}.byWords(),

		rmClass: function(n) {
			var t = this;
			t.className = (" "+t.className+" ").replace(" "+n+" "," ").trim();
			return t;
		}.byWords(),

		toggleClass: function(n, status) {
			var t = this;
			//if ( (arguments.length == 1 && !t.hasClass(n)) || status ) {
			if ( (status===void 0 && !t.hasClass(n)) || status ) {
				t.addClass(n);
				return true;
			}
			t.rmClass(n);
			return false;
		},

		empty: function() {
			var t = this, n;
			while (n = t.firstChild) t.kill.call(n);
			return t;
		},

		kill: function() {
			var t = this;
			if (t.parentNode) t.parentNode.removeChild(t);
			Event.removeAll(t);
			if ("empty" in t) t.empty();
			if ("kill_hook" in t) t.kill_hook();
			return t;
		},

		css: function(atr, val) {
			var t = this;
			if (typeof atr == "object") 
				for (var a in atr)
				/** hasOwnProperty
				if (atr.hasOwnProperty(a))
				//*/
				t.css(a, atr[a]);
			else if (val) t.style[ (css_map[atr]||atr).camelCase() ] = val;
			else getStyle(t, atr);
			return t;
		},

		on: function(w, fn) {
			Event.add(this, w, fn);
			return this;
		}.byWords(),

		non: function(w, fn) {
			Event.remove(this, w, fn);
			return this;
		}.byWords(),

		set: function(args) {
			var t = this, k, v;
			if (args) {
				if (typeof args == "string" || "nodeType" in args || "length" in args) t.append(args);
				else for (k in args) 
				/** hasOwnProperty
				if (args.hasOwnProperty(arg)) 
				//*/
				{
					v = args[k];
					// there are bug in ie<9 where later changed 'name' param not accepted in form submit
					/* cc_on
					if (@_jscript_version < 9 && k == "name") {
						//console.log(t.outerHTML.replace(/<\w+/, '$& name="'+v+'"'))
						t = d.createElement( t.outerHTML.replace(/<\w+/, '$& name="'+v+'"'));
					} else @*/ 
					if (k == "class" || k == "className") t.addClass(v);
					else if (typeof v == "string") t.setAttribute(k, v);
					else if (!v) t.removeAttribute(k);
					else t[k] = v;
				}
			}
			return t;
		},

		find: "querySelector" in d ?
			function(sel){
				// IE8 don't support :disabled
				return this.querySelector(sel);
			} :
			function(sel) {
				var rules = ["_"]
					, tag = sel.replace(el_re, function(_, o, s) {
							rules.push( o == "." ? "(' '+_.className+' ').indexOf(' "+s+" ')>-1" : o == "#" ? "_.id=='"+s+"'" : "_."+s );
							return "";
						}) || "*"
					, fn = rules.join("&&").fn()
					, el
					, els = this.getElementsByTagName(tag)
					, i = 0;

				while (el = els[i++]) if (fn(el)) return "to" in el ? el : extend(el);
			}
	}

	if (!(El[P] = extend( (w.HTMLElement || w.Element || {})[P] , a))) {
		// for IE 6-7, IE8 supports Element
		El[P] = a;
		var c = d.createElement
		  //, g = d.getElementById

		extend(d.body);
	
		d.createElement = function(n/*ame */) {return extend(c(n))}
		//d.getElementById = function(i){var e=g(i);return "append"in e ? e : extend(e)}
	}

	w.El = El;
	//*/

	//** xhr
	var xhrs = []
	  , anon = function(){};

	w.xhr = function(method, url, cb, sync){
		var r = xhrs.shift() || new XMLHttpRequest();
		r.open(method, url, !sync);
		r.onreadystatechange = function(){
			if (r.readyState == 4) {
				cb && cb( r.responseText, r);
				r.onreadystatechange = cb = anon;
				xhrs.push(r);
			}
		}
		return r;
	};
	//*/

	a = d.getElementsByTagName("script");
	// eval in a global context for non-IE & non-Chrome (removed form v8 on 2011-05-23: Version 3.3.9)
	// THANKS: Juriy Zaytsev - Global eval [http://perfectionkills.com/global-eval-what-are-the-options/]
	if (!("execScript" in w)) {
		w.execScript = (function(o,Object){return(1,eval)("(Object)")===o})(Object,1) ? eval : function(s){
			El("script", s).after(a);
		}
	}

	//** loader - helpers
	b = a[a.length-1].src.replace(/[^\/]+$/,"");
	//*/


	/** loader.CommonJS style modules
	var _required = {}
	w.require = function(file) {
		if (file in _required) return _required[file];
		var req = new XMLHttpRequest(), exports = {};
		req.open("GET", file.replace(/^[^\/]/, w.require.path+"$&"), false);
		req.send();
		eval(req.responseText);
		return _required[file] = exports;
	}
	w.require.path = b;
	//*/


	//** loader.async
	w.load = function(f, cb) {
		if (!Array.isArray(f)) f=[f];
		var i=0, len=f.length, res = [];
		while (i<len) !function(i) {
			xhr("GET", f[i].replace(/^[^\/]/, w.load.path+"$&"), function(str) {
				res[i] = str;
				//for (var str,e="";str=res[loaded];++loaded){e+=str};
				//e && execScript(e);
				if (!--len) {
					execScript( res.join(";") );
					cb && cb();
					res = null;
				}
			}).send();
		}(i++);
	}
	w.load.path = b;
	//*/

}(window, document, "prototype");
