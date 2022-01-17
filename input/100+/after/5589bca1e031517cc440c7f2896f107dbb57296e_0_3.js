function rep(re, str) {





s = s.replace(re,str);



				//modify code to keep stuff intact within [code][/code] blocks

				//Waitman Gobble NO WARRANTY



/* This doesn't seem to work well with

[code]line1

line2[/code]

commenting out for now

*/



/*

				var o = new Array();

				var x = s.split("[code]");

				var i = 0;



				var si = "";

				si = x.shift();

				si = si.replace(re,str);

				o.push(si);



				for (i = 0; i < x.length; i++) {

					var no = new Array();

					var j = x.shift();

					var g = j.split("[/code]");

					no.push(g.shift());

					si = g.shift();

					si = si.replace(re,str);

					no.push(si);

					o.push(no.join("[/code]"));

				}



				s = o.join("[code]");

*/

			}