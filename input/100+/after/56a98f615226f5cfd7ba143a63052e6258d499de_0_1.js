function(text, isFragment) {

			var	oldText, replaceBBCodeFunc,
				bbcodeRegex = /\[([^\[\s=]+)(?:([^\[\]]+))?\]((?:[\s\S](?!\[\1))*?)\[\/(\1)\]/g,
				atribsRegex = /(\S+)=((?:(?:(["'])(?:\\\3|[^\3])*?\3))|(?:[^'"\s]+))/g;

			replaceBBCodeFunc = function(str, bbcode, attrs, content)
			{
				var	attrsMap = {},
					matches;
				
				bbcode = bbcode.toLowerCase();
				
				if(attrs)
				{
					attrs = $.trim(attrs);
					
					// if only one attribute then remove the = from the start and strip any quotes
					if((attrs.charAt(0) === "=" && (attrs.split("=").length - 1) <= 1) || bbcode === 'url')
						attrsMap.defaultattr = base.stripQuotes(attrs.substr(1));
					else
					{
						if(attrs.charAt(0) === "=")
							attrs = "defaultattr" + attrs;

						while((matches = atribsRegex.exec(attrs)))
							attrsMap[matches[1].toLowerCase()] = base.stripQuotes(matches[2]);
					}
				}

				if(!base.bbcodes[bbcode])
					return str;

				if($.isFunction(base.bbcodes[bbcode].html))
					return base.bbcodes[bbcode].html.call(base, bbcode, attrsMap, content);
				else
					return formatString(base.bbcodes[bbcode].html, content);
			};

			text = text.replace(/&/g, "&amp;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;")
					.replace(/\r/g, "")
					.replace(/(\[\/?(?:left|center|right|justify|align|rtl|ltr)\])\n/g, "$1")
					.replace(/\n/g, "<br />");

			while(text !== oldText)
			{
				oldText = text;
				text    = text.replace(bbcodeRegex, replaceBBCodeFunc);
			}

			// As hr is the only bbcode not to have a start and end tag it's
			// just being replace here instead of adding support for it above.
			text = text.replace(/\[hr\]/gi, "<hr>")
					.replace(/\[\*\]/gi, "<li>");

			// replace multi-spaces which are not inside tags with a non-breaking space
			// to preserve them. Otherwise they will just be converted to 1!
			text = text.replace(/ {2}(?=([^<\>]*?<|[^<\>]*?$))/g, " &nbsp;");
			
			return wrapInDivs(text, isFragment);
		}