function(_, junk, bracket, sep) {
				var sep = bracket + sep + sep;

				// Extract id=1*

				if (junk.indexOf("*") !== -1) {
					return '(""+i.' + junk.split(".").join("\\.").split("*").join(".*").replace("=",").search(/") + "/i)>-1" + sep;
				}

				// Extract id={1,3-6,9-,one,two}

				var list = junk.match(/^([^\[\{=]+)=?(\[|\{)([^\]\}]+)(\]|\})$/);
				if (list) {
					var comp = "i." + list[1], list = list[3].replace(
						/[^,]+/g
					, function(all,from,to) {
							var range = all.split("-");
							if (range.length == 1) {
								return comp + "==" + slash(all);
							}
							var a = [];
							range[0].length && a.push( comp + ">=" + slash(range[0]) );
							range[1].length && a.push( comp + "<=" + slash(range[1]) );
							return "(" + a.join("&&") + ")";
						}
					)
					return "(" + list.split(",").join("||") + ")" + sep;
				}

				// Extract id=1
				var pos = junk.indexOf("=");
				if (pos !== -1) {
					return "''+i." + junk.substr(0,pos) + "==''+" + slash( junk.substr(pos+1) ) + sep;
				}

				// Extract required fields /collection[id&name]
				if (junk.indexOf(".") > -1)
					return slash(junk)+'.split(".").reduce(function(a,b){return a && b in a && a[b]}, i)'
				return slash(junk) + " in i" + sep;
			}