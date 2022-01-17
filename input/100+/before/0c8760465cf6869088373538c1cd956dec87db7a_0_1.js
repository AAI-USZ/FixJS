function(){
	var namespaceIds = mediaWiki.config.get("wgNamespaceIds");
	var thisNamespaceId = mw.config.get('wgNamespaceNumber');

	if ( thisNamespaceId === 2 /* User: */ || thisNamespaceId === 3 /* User talk: */ ) {
		return mw.config.get('wgTitle').split( '/' )[0];  // only first part before any slashes, to work on subpages
	}

	if ( thisNamespaceId === namespaceIds['special'] && mw.config.get('wgCanonicalSpecialPageName') === "Contributions" ) {
		return decodeURIComponent(/wiki\/Special:Log\/(.+)$/.exec($('div#contentSub a[title^="Special:Log"]').last().attr("href").replace(/_/g, "%20"))[1]);
	}

	return false;
}