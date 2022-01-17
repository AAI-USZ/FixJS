function (componentid) {
	var DOMUtil = eXo.core.DOMUtil;
	var me = eXo.wiki.UIRelated;
	var relatedBlock = document.getElementById(componentid);
	var infoElement = DOMUtil.findFirstDescendantByClass(relatedBlock, "input", "info");
	var restUrl = infoElement.getAttribute("restUrl");
	var redirectTempl = infoElement.getAttribute("redirectUrl");
	var request =  eXo.core.Browser.createHttpRequest();
	request.open('GET', restUrl, false);
	request.setRequestHeader("Cache-Control", "max-age=86400") ;
	request.send(null);
	var dataList = eXo.core.JSON.parse(request.responseText);
	relatedList = dataList.jsonList;
	var docFrag = me.initRelatedDOM(relatedList, redirectTempl);
	relatedBlock.appendChild(docFrag);
}