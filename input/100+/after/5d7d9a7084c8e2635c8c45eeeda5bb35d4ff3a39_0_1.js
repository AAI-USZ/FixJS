function (nodePath) {
	var that = this,
		nodesHtml = [],
		cslData = CSLEDIT.data.get();

	$.each(nodePath, function (i, cslId) {
		var node = CSLEDIT.data.getNode(cslId, cslData);
		nodesHtml.push('<span cslid="' + node.cslId + '">' + node.name + '</span>');
	});

	this.element.html(nodesHtml.join(" > "));

	this.element.find('span[cslid]').css({"cursor" : "pointer"});
	this.element.find('span[cslid]').off('click');
	this.element.find('span[cslid]').on('click', function(event) {
		var thisNodePath = [],
			thisCslId = parseInt($(event.target).attr("cslid"));

		$.each(nodePath, function (i, cslId) {
			thisNodePath.push(cslId);
			if (cslId === thisCslId) {
				return false;
			}
		});
		
		that.callbacks.selectNodeFromPath(thisNodePath);
	});
	this.element.find('span[cslid]').hover(this.syntaxHighlighter.hover, this.syntaxHighlighter.unhover);

	//$.each(nodePath, function (i, cslId) {
	//	that.callbacks.setupSyntaxHighlightForNode(cslId);
	//});
}