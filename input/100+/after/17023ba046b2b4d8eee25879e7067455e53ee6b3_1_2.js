function(_) {
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