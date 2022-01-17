function(html, excludeFirstLast)
		{
			var	d		= document,
				inlineFrag	= d.createDocumentFragment(),
				outputDiv	= d.createElement('div'),
				tmpDiv		= d.createElement('div'),
				div, node, next, nodeName;

			$(tmpDiv).hide().appendTo(d.body);
			tmpDiv.innerHTML = html;

			node = tmpDiv.firstChild;
			while(node)
			{
				next = node.nextSibling;
				nodeName = node.nodeName.toLowerCase();

				if((node.nodeType === 1 && !$.sceditor.dom.isInline(node)) || nodeName === "br")
				{
					if(inlineFrag.childNodes.length > 0 || nodeName === "br")
					{
						div = d.createElement('div');
						div.appendChild(inlineFrag);

						// Putting BR in a div in IE9 causes it to do a double line break,
						// as much as I hate browser UA sniffing, to do feature detection would
						// be more code than it's worth for this specific bug.
						if(nodeName === "br" && !$.sceditor.ie)
							div.appendChild(d.createElement('br'));

						// If it's an empty DIV and in compatibility mode is below IE8 then
						// we must add a non-breaking space to the div otherwise the div
						// will be collapsed. Adding a BR works but when you press enter
						// to make a newline it suddenly gose back to the normal IE div
						// behaviour and creates two lines, one for the newline and one
						// for the BR. I'm sure there must be a better fix but I've yet to
						// find one.
						// Cannot do zoom: 1; or set a height on the div to fix it as that
						// causes resize handles to be added to the div when it's clicked on/
						if(!div.childNodes.length && (d.documentMode && d.documentMode < 8 || $.sceditor.ie < 8))
							div.appendChild(d.createTextNode('\u00a0'));

						outputDiv.appendChild(div);
						inlineFrag = d.createDocumentFragment();
					}

					if(nodeName !== "br")
						outputDiv.appendChild(node);
				}
				else
					inlineFrag.appendChild(node);

				node = next;
			}

			if(inlineFrag.childNodes.length > 0)
			{
				div = d.createElement('div');
				div.appendChild(inlineFrag);
				outputDiv.appendChild(div);
			}

			// needed for paste, the first shouldn't be wrapped in a div
			if(excludeFirstLast)
			{
				node = outputDiv.firstChild;
				if(node && node.nodeName.toLowerCase() === "div")
				{
					while((next = node.firstChild))
						outputDiv.insertBefore(next, node);

					if($.sceditor.ie >= 9)
						outputDiv.insertBefore(d.createElement('br'), node);

					outputDiv.removeChild(node);
				}

				node = outputDiv.lastChild;
				if(node && node.nodeName.toLowerCase() === "div")
				{
					while((next = node.firstChild))
						outputDiv.insertBefore(next, node);

					if($.sceditor.ie >= 9)
						outputDiv.insertBefore(d.createElement('br'), node);

					outputDiv.removeChild(node);
				}
			}

			$(tmpDiv).remove();
			return outputDiv.innerHTML;
		}