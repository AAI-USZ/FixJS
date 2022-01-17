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
						if(nodeName === "br" && (!$.sceditor.ie || $.sceditor.ie < 9))
							div.appendChild(d.createElement('br'));

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