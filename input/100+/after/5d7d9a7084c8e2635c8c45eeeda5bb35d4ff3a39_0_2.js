function (i, cslId) {
		var node = CSLEDIT.data.getNode(cslId, cslData);
		nodesHtml.push('<span cslid="' + node.cslId + '">' + node.name + '</span>');
	}