function createCollection(docId){
    createCollectionHandler
    var atom = createAtom('folder',collectionName);
    request = {
	'method' : 'POST',
	'URI' : DOCLIST_FEED,
	'contentType' : 'application/atom+xml',
	'body' : atom,
	'onReadyHandler' : funHandler
    }
    makeRequest(request);
}