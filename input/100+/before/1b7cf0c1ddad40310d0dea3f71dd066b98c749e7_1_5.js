function() {
		// get node from xml document
        	var se = xml.evaluate(parentPath+'/'+element.elementTitle.replace(/\\/g,"")+'['+count+']', xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

		var sibling = node_after(se.singleNodeValue);

		// if(sibling == null) alert("sibling 1 is null");
		// if(sibling) alert(sibling.nodeType);
		if(sibling == null) return; // already the last non-WS element

		var sibling2 = node_after(sibling); // Have to get 'node_after' twice to use insertBefore

		// if(sibling2 == null) alert("sibling 2 is null");
		// if(sibling) alert(sibling.nodeType);

        	var pe = se.singleNodeValue.parentNode;

		if(sibling2) {
			pe.insertBefore(se.singleNodeValue, sibling2);
		} else {
			pe.appendChild(se.singleNodeValue);
		}

		return;

		// redisplay listing
		var total = $(containerId).children("."+element.title+'Instance').length;
		$(containerId).children("."+element.title+'Instance').remove();
	
		// add elements back to the UI
		for(var k = 1; k <= total; k++) {
				createElement(element, xml, parentPath, k, containerId, indent);
		}
	}