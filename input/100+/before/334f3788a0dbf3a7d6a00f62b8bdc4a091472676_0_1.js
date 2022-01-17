function() {
	var me = eXo.wiki.UIRelated;
	var relatedBlocks = gj(".RelatedMacro");
	var editForm = document.getElementById('UIWikiPageEditForm');
	if (editForm != null) {
		var ifm = gj(editForm).find('iframe.gwt-RichTextArea')[0];
		if (ifm != null) {
		var innerDoc = ifm.contentDocument || ifm.contentWindow.document;
		relatedBlocks = gj.merge(relatedBlocks, gj(innerDoc).find(
				".RelatedMacro"));
		}
	}
	for ( var i = 0; i < relatedBlocks.length; i++) {
		var relatedBlock = relatedBlocks[i];
		var infoElement = gj(relatedBlock).find('input.info')[0];
		var restUrl = infoElement.getAttribute("restUrl");
		var redirectTempl = infoElement.getAttribute("redirectUrl");
		gj.ajax({
			async : false,
			url : restUrl,
			type : 'GET',
			data : '',
			success : function(data) {
				var docFrag = me.initRelatedDOM(data.jsonList, redirectTempl);
				relatedBlock.appendChild(docFrag);
			}
		});

	}
}