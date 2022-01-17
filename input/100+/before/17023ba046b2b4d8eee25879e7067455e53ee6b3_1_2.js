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