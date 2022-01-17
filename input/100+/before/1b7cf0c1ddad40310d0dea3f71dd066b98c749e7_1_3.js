function() {
		// get node from xml document
        	var se = xml.evaluate(parentPath+'/'+element.elementTitle.replace(/\\/g,"")+'['+count+']', xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        	var pe = se.singleNodeValue.parentNode;

		pe.removeChild(se.singleNodeValue);

		// redisplay listing
		var total = $(containerId).children("."+element.title+'Instance').length;
		$(containerId).children("."+element.title+'Instance').remove();
	
		// if there was more than just the one (now deleted) element present, add them back to the UI
		if(total > 1) {
			for(var k = 1; k < total; k++) {
				createElement(element, xml, parentPath, k, containerId, indent);
			}
		}
	}