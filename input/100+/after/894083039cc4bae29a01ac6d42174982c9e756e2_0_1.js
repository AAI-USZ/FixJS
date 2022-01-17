function twinklespeedyCallbackEvaluateSysop(e)
{
	mw.config.set('wgPageName', mw.config.get('wgPageName').replace(/_/g, ' ')); // for queen/king/whatever and country!
	var form = (e.target.form ? e.target.form : e.target);

	var tag_only = form.tag_only;
	if( tag_only && tag_only.checked ) {
		Twinkle.speedy.callback.evaluateUser(e);
		return;
	}

	var value = Twinkle.speedy.resolveCsdValue(e);
	if (!value) {
		return;
	}
	var normalized = Twinkle.speedy.normalizeHash[ value ];

	var params = {
		value: value,
		normalized: normalized,
		watch: Twinkle.getPref('watchSpeedyPages').indexOf( normalized ) !== -1,
		reason: Twinkle.speedy.reasonHash[ value ],
		openusertalk: Twinkle.getPref('openUserTalkPageOnSpeedyDelete').indexOf( normalized ) !== -1,
		deleteTalkPage: form.talkpage && form.talkpage.checked,
		deleteRedirects: form.redirects.checked
	};

	Morebits.simpleWindow.setButtonsEnabled( false );
	Morebits.status.init( form );

	Twinkle.speedy.callbacks.sysop.main( params );
}