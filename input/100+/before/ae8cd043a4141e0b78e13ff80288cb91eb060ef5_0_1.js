function(w/* window */) {
  var P = "prototype", A = Array[P], D = Date[P], F = Function[P], N = Number[P], O = Object[P], S = String[P]
  , sl
  , xhrs = []
  , Nop = function(){}
  , a, b, c; // Reusable

  function I(o, n, s, x) {
    o[n] = o[n] || new Function("x","y","return function(a,b,c,d){"+s+"}").apply(null, x||[o, n])
  }

  // We need bind in beginning, other ECMAScript 5 stuff will come later
  I(F, "bind", "var t=this;b=x.call(arguments,1);c=function(){return t.apply(this instanceof c?this:a,b.concat.apply(b,arguments))};if(t[y])c[y]=t[y];return c", [A.slice, P]);

  sl = F.call.bind(A.slice)



  /** hasOwnProperty
  * Safari 2.0.2: 416     hasOwnProperty introduced October 31, 2005 (Mac OS X v10.4)
  I(O, "hasOwnProperty", "try{b=this.constructor;while(b=b[x])if(b[a]===this[a])return false}catch(e){}return true", [P]);
  //*/

  // instanceof not implemented in IE 5 MAC



  // Function extensions
  // -------------------
  
  F.construct = function(a) {
    return new(F.bind.apply(this, A.concat.apply([null], a)));
  }  

  F.clone = function() {
    var a = this.toString().match(/\((.*)\)\s*{([\s\S]*)}$/);
    return new Function(a[1].split(/[, ]+/), a[2]);
  }

  F.partial = function() {
    var t = this, a = sl(arguments);
    //return function() {return t.apply(this, a.concat(sl(arguments)))};
    return function() {return t.apply(this, A.concat.apply(a, arguments))};
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
    var t = this, f = t.clone(), i = 0;
    f[P] = Object.create(t[P]);
    while (t = arguments[i++]) Object.merge(f[P], t);
    return f;
  }

  F.chain = function(a) {
    return "a b->->b.call(this,a.apply(this,arguments))".reduce(Array.isArray(a) ? a : sl(arguments), this);
  }

  F.compose = function() {
    var a = [this].concat(sl(arguments)), t = a.pop()
    return t.chain(a);
  }

  F.guard = function(test, or) {
    var t = this
    , f = test.fn()
    , o = (or||Nop).fn();

    return function() {
      return (f.apply(this, arguments) ? t : o).apply(this, arguments);
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

  F.byWords = function(i) {
    var t = this;
    i |= 0;
    return function() {
      var s = this, r = s, a = arguments;
      ;(a[i]||"").replace(/\w+/g, function(w){a[i]=w;r=t.apply(s, a)});
      return r;
    }
  }

  F.byKeyVal = function() {
    var t = this;
    return function(o) {
      var s = this, a = sl(arguments), r;
      if (typeof o == "object") for (r in o) {
        a[0] = r;
        a[1] = o[r];
        r = t.apply(s, a);
      } else r = t.apply(s, a);
        return r;
    }
  }

  /*
  F.flip = function() {
    var t = this;
    return function() {
      var a = arguments, b = a[0];
      a[0] = a[1]
      a[1] = b
      return t.apply(this, a);
    }
  }
  */
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

  // THANKS: Oliver Steele - String lambdas [http://osteele.com/javascripts/functional]

  w.Fn = function(s) {
    var a = []
    , t = s.split("->");

    if (t.length > 1) while (t.length) {
      s = t.pop();
      a = t.pop().trim().split(/[\s,]+/);
      t.length && t.push("(function("+a+"){return("+s+")})");
    } else {
      // test whether an operator appears on the left
      if (t = s.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=)/)) {
        a.push("$1");
        s = "$1" + s;
      }
      // test whether an operator appears on the right
      if (s.match(/[+\-*\/%&|\^\.=<>!]\s*$/)) {
        a.push("$2");
        s += "$2";
      } else if (!t) a = "_"
    }
    return new Function(a, "return(" + s + ")");
  }.cache();

  S.fn = function(){
    return Fn(this);
  }

  F.fn = function() {
    return this;
  }



  // Object extensions
  // -----------------
  a = Object;

  // ### Object.create ###
  // ES5
  I(a, "create" , "x[y]=a;return new x", [Nop, P]);
  // ### Object.keys ###
  // ES5
  I(a, "keys"   , "c=[];for(b in a)a.hasOwnProperty(b)&&c.push(b);return c");
  // Non-standard
  I(a, "each"   , "for(d in a)a.hasOwnProperty(d)&&b.call(c,a[d],d,a)");
  a.merge = function(main){
    var o, i = 1, k;
    while (o = arguments[i++]) for (k in o) if (o.hasOwnProperty(k)) main[k] = o[k]
    return main;
  }



  // Array extensions
  // ----------------
  a = Array;

  // ### Array.isArray ###
  //
  // Native in FF

  I(a, "isArray", "return a instanceof Array");

  // Non-standard
  I(a, "from"   , "for(b=[],c=a.length;c--;b.unshift(a[c]));return b");
  /*
  Array.flatten = function(arr){
  for(var i=arr.length;i--;)
  0 in arr[i] && A.splice.apply(arr, [i, 1].concat(Array.flatten(arr[i])));
  return arr
  };
  flat([1,2,[3,4,[5,6]],7]);
  */

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
  I(A, "remove",   a+"o=x(arguments);while(l--)if(o.indexOf(t[l])>-1)t.splice(l,1);return t", [sl]);
  I(A, "indexFor", a+"i=b?0:l;while(i<l)b.call(c,a,t[o=(i+l)>>1])<0?l=o:i=o+1;return i");
  
  A.unique = A.filter.partial(function(s,i,a){return i == a.lastIndexOf(s)});


  

  !function(n){
    F[n] = S[n] = function(){
      var t = this, a = arguments, arr = a[0]
      a[0] = t.fn();
      return A[n].apply(arr, a);
    }
  }.byWords()("every filter forEach map reduce reduceRight some");

  F.each = S.each = F.forEach;
  F.fold = S.fold = F.reduce;
  F.foldr = S.foldr = F.reduceRight;
  F.select = S.select = F.filter;


  // THANKS: Sudhir Jonathan - Namespacing [http://hangar.runway7.net/javascript/namespacing]
  w.ns = function(n, s) {
    return "h n->h[n]=h[n]||{}".fold(n.split("."), s||w)
  }

  /*
  // http://seanhess.github.com/2012/02/20/functional_javascript.html
  // http://msdn.microsoft.com/en-us/scriptjunkie/gg575560

  function lt(a, b) {
      return (a < b)
  }
  function eq(a, b) {
      return (a == b)
  }
  function apply(f) {
      var args = Array.prototype.slice.call(arguments, 1)
      return function(x) {
          return f.apply(null, args.concat(x))
      }
  }

  function applyr(f) {
      var args = Array.prototype.slice.call(arguments, 1)
      return function(x) {
          return f.apply(null, [x].concat(args))
      }
  }

    // typeof
    var a = F.call.bind(O.toString)
    a(1).slice(8, -1).toLowerCase() // number
  */




  // String extensions
  // -----------------

  S.trim = S.trim || S.replace.partial(/^[\s\r\n\u2028\u2029]+|[\s\r\n\u2028\u2029]+$/g, "");
  S.camelCase = S.replace.partial(/[ _-]+([a-z])/g, function(_, a){return a.toUpperCase()});

  S.format = function(m) {
    var a = typeof m == "object" ? m : arguments;
    return this.replace(/\{(\w+)\}/g, function(_, i){return a[i]});
  }

  S.safe = function() {
    return this
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
  }

  S.toAccuracy = N.toAccuracy = function(a) {
    var x = (""+a).split("."), n = ~~((this/a)+.5) * a;
    return ""+(1 in x ? n.toFixed(x[1].length) : n);
  }

  N.words = S.words = function(steps, units, strings){
    var n = +this
    , i = 0
    , s = strings || {"default":"{0} {1}"};

    while(n>steps[i])n/=steps[i++];
    i=units[i];
    return (n<2&&s[i+"s"]||s[i]||s["default"]).format(n|0, i);
  }

  S.humanSize = N.humanSize = N.words.partial([1024,1024,1024],["byte","KB","MB","GB"])
  S.humanTime = N.humanTime = N.words.partial([60,60,24],["sec","min","hour","day"])


  //** String.utf8
  S.utf8_encode = function() {
    return unescape( encodeURIComponent( this ) );
  }

  S.utf8_decode = function() {
    return decodeURIComponent( escape( this ) );
  }
	//*/

  /** IP helpers
  S.ip2int = function() {
    var t = (this+".0.0.0").split(".");
    return ((t[0] << 24) | (t[1] << 16) | (t[2] << 8 ) | (t[3]))>>>0;
  }

  S.int2ip = N.int2ip = function() {
    var t = +this;
    return [t>>>24, (t>>>16)&0xFF, (t>>>8)&0xFF, t&0xFF].join(".");
  }
  //*/



  // Date extensions
  // ---------------

  function p2(n) {
    return n>9?n:"0"+n
  }

  function p3(n) {
    return (n>99?n:(n>9?"0":"00")+n)
  }

  //** Date.format
  // ISO 8601 specifies numeric representations of date and time.
  // The international standard date notation is
  //
  // YYYY-MM-DD
  // The international standard notation for the time of day is
  //
  // TODO:2012-03-05:lauriro:Date week number not complete
  // http://en.wikipedia.org/wiki/ISO_week_date
  //
  // hh:mm:ss
  //
  // Time zone
  //
  // The strings
  //
  // +hh:mm, +hhmm, or +hh
  //
  // can be added to the time to indicate that the used local time zone is hh hours and mm minutes ahead of UTC. For time zones west of the zero meridian, which are behind UTC, the notation
  //
  // -hh:mm, -hhmm, or -hh
  //
  // is used instead. For example, Central European Time (CET) is +0100 and U.S./Canadian Eastern Standard Time (EST) is -0500. The following strings all indicate the same point of time:
  //
  // 12:00Z = 13:00+01:00 = 0700-0500

  D.format = function(_) {
    var t = this
    , x = D.format.masks[_] || _ || D.format.masks["default"]
    , g = "get" + (x.slice(0,4) == "UTC:" ? (x=x.slice(4), "UTC"):"")
    , Y = g + "FullYear"
    , M = g + "Month"
    , d = g + "Date"
    , w = g + "Day"
    , h = g + "Hours"
    , m = g + "Minutes"
    , s = g + "Seconds"
    , S = g + "Milliseconds";

    return x.replace(/(")([^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|(YY(?:YY)?|M{1,4}|D{1,4}|([HhmsS])\4?|[uUaAZw])/g,
      function(a, b, c) {
        return a == "YY"   ? (""+t[Y]()).slice(2)
        : a == "YYYY" ? t[Y]()
        : a == "M"    ? t[M]()+1
        : a == "MM"   ? p2(t[M]()+1)
        : a == "MMM"  ? D.monthNames[ t[M]() ]
        : a == "MMMM" ? D.monthNames[ t[M]()+12 ]
        : a == "D"    ? t[d]()
        : a == "DD"   ? p2(t[d]())
        : a == "DDD"  ? D.dayNames[ t[w]() ]
        : a == "DDDD" ? D.dayNames[ t[w]()+7 ]
        : a == "H"    ? (""+t[h]()%12||12)
        : a == "HH"   ? p2(t[h]()%12||12)
        : a == "h"    ? t[h]()
        : a == "hh"   ? p2(t[h]())
        : a == "m"    ? t[m]()
        : a == "mm"   ? p2(t[m]())
        : a == "s"    ? t[s]()
        : a == "ss"   ? p2(t[s]())
        : a == "S"    ? t[S]()
        : a == "SS"   ? p3(t[S]())
        : a == "u"    ? (""+(t/1000)>>>0)
        : a == "U"    ? +t
        : a == "a"    ? (t[h]() > 11 ? "pm" : "am")
        : a == "A"    ? (t[h]() > 11 ? "PM" : "AM")
        : a == "Z"    ? "GMT " + (-t.getTimezoneOffset()/60)
        : a == "w"    ? 1+Math.floor((t - new Date(t[Y](),0,4))/604800000)
        : b           ? c
        : a;
      }
    )
  }

  D.format.masks = {"default":"DDD MMM DD YYYY hh:mm:ss","isoUtcDateTime":'UTC:YYYY-MM-DD"T"hh:mm:ss"Z"'};
  D.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec January February March April May June July August September October November December".split(" ");
  D.dayNames = "Sun Mon Tue Wed Thu Fri Sat Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");


  I(D, "toISOString", "return this.format('isoUtcDateTime')");
  // D.toISOString = D.toISOString || D.format.partial('isoUtcDateTime');
  /*/
  I(D, "toISOString", "var t=this;return t.getUTCFullYear()+'-'+p2(t.getUTCMonth()+1)+'-'+p2(t.getUTCDate())+'T'+p2(t.getUTCHours())+':'+p2(t.getUTCMinutes())+':'+p2(t.getUTCSeconds())+'.'+p3(t.getUTCMilliseconds())+'Z'")
  //*/


  //** Date helpers

  //, n = +t || Date.parse(t) || ""+t; // In Chrome Date.parse("01.02.2001") is Jan
  S.date = N.date = function(format) {
    var t = this, d = new Date(), m, n = +t || ""+t;
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
    return (new Date(this.getFullYear(),this.getMonth()+1,0)).getDate();
  }
  //*/

  //** Date.startOfWeek
  D.startOfWeek = function() {
    var t = this;
    return new Date(t.getFullYear(), t.getMonth(), t.getDate() - (t.getDay() || 7) +1);
  }
  //*/



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

  //   D.pretty2 = function(){return (new Date() - this + 1)/1000}
  //     .chain(F.call.bind(N.words.partial([60,60,24,7,30],["second","minute","hour","day","week","month"],{"default":"{0} {1} ago", "day":"Yesterday","minutes":"minutit"}))) 
  //     .guard("this<8640000", D.format)
  //*/



  // XMLHttpRequest was unsupported in IE 5.x-6.x
  // MSXML version 3.0 was the last version of MSXML to support version-independent ProgIDs.
  I(w, "XMLHttpRequest", "return new ActiveXObject('MSXML2.XMLHTTP')");
  //I(w, "XMLHttpRequest", "a=function(n){n='MSXML2.XMLHTTP'+n;try{x[y]=function(){return new ActiveXObject(n)};return new x[y]}catch(e){}};return a('.6.0')||a('')");


  //** xhr
  w.xhr = function(method, url, cb, sync){
    var r = xhrs.shift() || new XMLHttpRequest();
    r.open(method, url, !sync);
    r.onreadystatechange = function(){
      if (r.readyState == 4) {
        cb && cb( r.responseText, r);
        r.onreadystatechange = cb = Nop;
        xhrs.push(r);
      }
    }
    return r;
  };
  //*/


  if (!("JSON" in w)) {
    w.JSON = {
      map: {"\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t",'"':'\\"',"\\":"\\\\"},
      parse: Fn("t->new Function('return('+t+')')()"),
      stringify: new Function("o", "if(o==null)return'null';if(o instanceof Date)return'\"'+o.toISOString()+'\"';var i,s=[],c;if(Array.isArray(o)){for(i=o.length;i--;s[i]=JSON.stringify(o[i]));return'['+s.join()+']'}c=typeof o;if(c=='string'){for(i=o.length;c=o.charAt(--i);s[i]=JSON.map[c]||(c<' '?'\\\\u00'+((c=c.charCodeAt())|4)+(c%16).toString(16):c));return'\"'+s.join('')+'\"'}if(c=='object'){for(i in o)o.hasOwnProperty(i)&&s.push(JSON.stringify(i)+':'+JSON.stringify(o[i]));return'{'+s.join()+'}'}return''+o")
    }
  }

}