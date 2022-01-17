function(record, pattern) {
			
			var Mustache = require('mustache'), // require again for faster scope resolution
				records = [],
			    args = Array.apply(Array, arguments), // make arguments a proper array
			
			   	ptn = "<p>{{author}}. "+
			          "<em> {{title}}. </em> "+
			          "{{#booktitle}}In {{booktitle}}. {{/booktitle}}"+
			          "{{#pages}} pages {{pages}}, {{/pages}}"+
			          "{{#publisher}} {{publisher}}, {{/publisher}}"+
			          " {{year}}</p>"; // default pattern;
			
			// extract a provided pattern, if provided
			if (args.length > 1) {
				var last = args[args.length-1];
				if (isString(last)) {
					ptn = args.pop();
				}
			}
			
			// map different format of args to array of records
			if (args.length > 1) { // object, object, ...
				records = args;
			}
			else if (args.length == 1) {
				if (isString(args[0])) { // string
					var b = new Bibtex(args[0]);
					b.parse();
					records = b.records;
				}
				else if (isArray(args[0])) { // arrray
					records = args[0]
				}
				else { // object
					records = [args[0]];
				}
			}
			else {
				args = [];
			}
			
			// remove empty records
			records = records.filter(function(i){return !isNot(i)});
			
			// do not try to render empty or undefined list of records
			if (0 == records.length) {
				return "";
			}
			
			return records.map(function(r) {
				for (var k in r) {
					if ("editor" == k || "author" == k) {
						r[k] = formatAuthor(r[k])
					}
					else if ("_raw" == k) {
						// ignore
					}
					else {
						r[k] = cleanValue(r[k]);
					}
				}
				
				return Mustache.render(ptn, r);
			}).join("");
		}