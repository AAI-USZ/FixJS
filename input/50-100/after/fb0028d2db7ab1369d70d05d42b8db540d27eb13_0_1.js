function sendRequest(request, anchor_element)
{
	if(_is_locked)
		return;
		
	request = request + ';' + sSessionVar + '='	+ sSessionId + ';xml' + sSID;
	var sUrl = smf_prepareScriptUrl(smf_scripturl) + request;
	setBusy(1);
	if(anchor_element == null)
		sendXMLDocument(sUrl, '', response_xml);
	else
		sendXMLDocumentWithAnchor(sUrl, '', response, anchor_element);
}