function(data, callback) {
//	console.log(data);

	var flashvars = parseFlashVariables(data.params.flashvars);
	var matches = /mgid:(.*?\.\w+:)[-\w]+/.exec(data.src);
	var mgid = matches[0];

	// The context number in the URL below is important.  I can't figure out how to derive
	// it or even better derive the entire URL.
	// The swf on the page redirects to a URL the contains the all important config url.
	// As far as I can see there's know way to grab the redirected location.
	//
	// E.g., this URL (which is the data.src): http://media.mtvnservices.com/mgid:cms:video:colbertnation.com:404447
	// redirects to this:
	// http://media.mtvnservices.com/player/prime/mediaplayerprime.1.11.3.swf?uri=mgid:cms:video:colbertnation.com:404447&type=normal&ref=None&geo=GB&group=entertainment&&CONFIG_URL=http%3a%2f%2fmedia.mtvnservices.com%2fpmt%2fe1%2fplayers%2fmgid%3acms%3avideo%3acolbertnation.com%3a%2fcontext3%2fconfig.xml%3furi%3dmgid%3acms%3avideo%3acolbertnation.com%3a404447%26type%3dnormal%26ref%3dNone%26geo%3dGB%26group%3dentertainment%2
	//
	// You can see in the URL immediately above that the CONFIG_URL is there, but how do
	// I grab it?
	// The configURL isn't in the data var either.  I can't access the current page from
	// the killer unless I make an XHR to grab it, but even if I do that I can't grab
	// the redirected URL.
	// XHR'ing the data.src erases any evidence of Location headers.  I thought I could
	// perhaps inject an iframe into the globalpage, with its src = data.src, but Safari
	// doesn't even attempt to load the content.

	// So en lieu of being able to accurately derive the configURL, I do the best I can
	// with the info available in the data var and the knowledge that I've acquired
	// when visiting each of the supported sites.

	// I've discovered that the context number given in the CONFIG_URL varies depending on
	// your geo location, you'll either be provided with a context number
	// that works or one that doesn't.  E.g., colbert episodes provides me with a context
	// of 7 in the US but 5 in the UK. context5 doesn't work.
	// So it's perhaps better that we don't derive it but instead hardcode it.

	// Try to get a context, if we can't lets set it to context1, it might work.  Better
	// than nothing.
	var context = this.contexts[matches[1]];
	if( typeof(context) == "undefined" )
		context = "context1";

	var configURL = 'http://media.mtvnservices.com/pmt/e1/players/mgid:'+ matches[1] +'/' + context + '/config.xml';
	if( mgid.indexOf('mtv.com') >= 0 )
		configURL = 'http://www.mtv.com/player/embed/AS3/configuration.jhtml?uri=' + mgid + '&type=network&ref=www.mtv.com';

//	console.log(configURL);

	var callbackData = {"playlist": []};
	var _this = this;

	var xhr = new XMLHttpRequest();
	xhr.open('GET', configURL , true);
	xhr.addEventListener("load", function() {
		var doc = new DOMParser().parseFromString(this.responseText.replace(/^\s+/,''), "text/xml");
		var feedElement = doc.getElementsByTagName('feed')[0];
		var feedURL = feedElement.textContent;
		feedURL = feedURL.replace('{uri}',mgid);
		var fluxAccountDomain = doc.getElementsByTagName('fluxAccountDomain')[0].textContent;
		siteName = fluxAccountDomain.replace('community.','');
		data.siteName = siteName;

		// MTV has the info this doc, so there's no need to make an additional XHR
		var renditionsURLs = _this.getRenditionsURLsFromDoc( doc, data, callbackData, callback);

		// No renditionsURLs ? Then we're probably not on mtv so we'll need to make the
		// additional call that gets us the resource that contains the renditions.
		if( renditionsURLs.length == 0 )
			renditionsURLs = _this.getRenditionsURLsFromFeed( feedURL, data, callbackData, _this.processRenditions, callback);
		else
			_this.processRenditions( renditionsURLs, data, callbackData, callback );
	}, false);
	xhr.send(null);

	return;
}