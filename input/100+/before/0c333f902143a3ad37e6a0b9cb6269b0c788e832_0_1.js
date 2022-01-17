function(element, content, blockLevel) {
			var tag = element[0].nodeName.toLowerCase();

			// convert blockLevel to boolean
			blockLevel = !!blockLevel;

			if(tagsToBbcodes[tag] && tagsToBbcodes[tag][blockLevel]) {
				// loop all bbcodes for this tag
				$.each(tagsToBbcodes[tag][blockLevel], function(bbcode, bbcodeAttribs) {
					if(!content && !base.bbcodes[bbcode].allowsEmpty && isEmpty(element[0]))
						return;

					// if the bbcode requires any attributes then check this has
					// all needed
					if(bbcodeAttribs) {
						var runBbcode = false;

						// loop all the bbcode attribs
						$.each(bbcodeAttribs, function(attrib, values)
						{
							// if the element has the bbcodes attribute and the bbcode attribute
							// has values check one of the values matches
							if(!element.attr(attrib) || (values && $.inArray(element.attr(attrib), values) < 0))
								return;

							// break this loop as we have matched this bbcode
							runBbcode = true;
							return false;
						});

						if(!runBbcode)
							return;
					}

					if($.isFunction(base.bbcodes[bbcode].format))
						content = base.bbcodes[bbcode].format.call(base, element, content);
					else
						content = formatString(base.bbcodes[bbcode].format, content);
				});
			}

			// add newline after paragraph elements p and div (WebKit uses divs) and br tags
			if(blockLevel && /^(br|div|p)$/.test(tag))
			{
				var parentChildren = element[0].parentNode.childNodes;

				// if it's a <p><br /></p> the paragraph will put the newline so skip the br
				if(!("br" === tag && parentChildren.length === 1) &&
					!("br" === tag && parentChildren[parentChildren.length-1] === element[0])) {
					content += "\n";
				}

				// needed for browsers that enter textnode then when return is pressed put the rest in a div, i.e.:
				// text<div>line 2</div>
				if("br" !== tag && !$.sceditor.dom.isInline(element.parent()[0]) && element[0].previousSibling &&
					element[0].previousSibling.nodeType === 3) {
					content = "\n" + content;
				}
			}

			return content;
		}