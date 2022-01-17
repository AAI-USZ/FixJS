function(s) {

			s = tinymce.trim(s);



			function rep(re, str) {



				//modify code to keep stuff intact within [code][/code] blocks

				//Waitman Gobble NO WARRANTY





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



			};









			/* oembed */

			function _h2b_cb(match) {

				/*

				function s_h2b(data) {

						match = data;

				}

				$.ajax({

					type:"POST",

					url: 'oembed/h2b',

					data: {text: match},

					async: false,

					success: s_h2b,

					dataType: 'html'

				});

				*/

				

				var f, g, tof = [], tor = [];

				var find_spanc = /<span [^>]*class *= *[\"'](?:[^\"']* )*oembed(?: [^\"']*)*[\"'][^>]*>(.*?(?:<span[^>]*>(.*?)<\/span *>)*.*?)<\/span *>/ig;

				while (f = find_spanc.exec(match)) {

					var find_a = /<a([^>]* rel=[\"']oembed[\"'][^>]*)>.*?<\/a *>/ig;

					if (g = find_a.exec(f[1])) {

						var find_href = /href=[\"']([^\"']*)[\"']/ig;

						var m2 = find_href.exec(g[1]);

						if (m2[1]) {

							tof.push(f[0]);

							tor.push("[EMBED]" + m2[1] + "[/EMBED]");

						}

					}

				}

				for (var i = 0; i < tof.length; i++) match = match.replace(tof[i], tor[i]);

				

				return match;

			}

			if (s.indexOf('class="oembed')>=0){

				//alert("request oembed html2bbcode");

				s = _h2b_cb(s);

			}

			

			/* /oembed */





			// example: <strong> to [b]

			rep(/<a class=\"bookmark\" href=\"(.*?)\".*?>(.*?)<\/a>/gi,"[bookmark=$1]$2[/bookmark]");

			rep(/<a.*?href=\"(.*?)\".*?>(.*?)<\/a>/gi,"[url=$1]$2[/url]");

			rep(/<span style=\"font-size:(.*?);\">(.*?)<\/span>/gi,"[size=$1]$2[/size]");

			rep(/<span style=\"color:(.*?);\">(.*?)<\/span>/gi,"[color=$1]$2[/color]");

			rep(/<font>(.*?)<\/font>/gi,"$1");

			rep(/<img.*?width=\"(.*?)\".*?height=\"(.*?)\".*?src=\"(.*?)\".*?\/>/gi,"[img=$1x$2]$3[/img]");

			rep(/<img.*?height=\"(.*?)\".*?width=\"(.*?)\".*?src=\"(.*?)\".*?\/>/gi,"[img=$2x$1]$3[/img]");

			rep(/<img.*?src=\"(.*?)\".*?height=\"(.*?)\".*?width=\"(.*?)\".*?\/>/gi,"[img=$3x$2]$1[/img]");

			rep(/<img.*?src=\"(.*?)\".*?width=\"(.*?)\".*?height=\"(.*?)\".*?\/>/gi,"[img=$2x$3]$1[/img]");

			rep(/<img.*?src=\"(.*?)\".*?\/>/gi,"[img]$1[/img]");



			rep(/<ul class=\"listbullet\" style=\"list-style-type\: circle\;\">(.*?)<\/ul>/gi,"[list]$1[/list]");

			rep(/<ul class=\"listnone\" style=\"list-style-type\: none\;\">(.*?)<\/ul>/gi,"[list=]$1[/list]");

			rep(/<ul class=\"listdecimal\" style=\"list-style-type\: decimal\;\">(.*?)<\/ul>/gi,"[list=1]$1[/list]");

			rep(/<ul class=\"listlowerroman\" style=\"list-style-type\: lower-roman\;\">(.*?)<\/ul>/gi,"[list=i]$1[/list]");

			rep(/<ul class=\"listupperroman\" style=\"list-style-type\: upper-roman\;\">(.*?)<\/ul>/gi,"[list=I]$1[/list]");

			rep(/<ul class=\"listloweralpha\" style=\"list-style-type\: lower-alpha\;\">(.*?)<\/ul>/gi,"[list=a]$1[/list]");

			rep(/<ul class=\"listupperalpha\" style=\"list-style-type\: upper-alpha\;\">(.*?)<\/ul>/gi,"[list=A]$1[/list]");

			rep(/<li>(.*?)<\/li>/gi,'[li]$1[/li]');



			rep(/<code>(.*?)<\/code>/gi,"[code]$1[/code]");

			rep(/<\/(strong|b)>/gi,"[/b]");

			rep(/<(strong|b)>/gi,"[b]");

			rep(/<\/(em|i)>/gi,"[/i]");

			rep(/<(em|i)>/gi,"[i]");

			rep(/<\/u>/gi,"[/u]");

			rep(/<span style=\"text-decoration: ?underline;\">(.*?)<\/span>/gi,"[u]$1[/u]");

			rep(/<u>/gi,"[u]");

			rep(/<blockquote[^>]*>/gi,"[quote]");

			rep(/<\/blockquote>/gi,"[/quote]");

			rep(/<hr \/>/gi,"[hr]");

			rep(/<br (.*?)\/>/gi,"\n\n");

			rep(/<br\/>/gi,"\n\n");

			rep(/<br>/gi,"\n");

			rep(/<p>/gi,"");

			rep(/<\/p>/gi,"\n");

			rep(/&nbsp;/gi," ");

			rep(/&quot;/gi,"\"");

			rep(/&lt;/gi,"<");

			rep(/&gt;/gi,">");

			rep(/&amp;/gi,"&");



			return s; 

		}