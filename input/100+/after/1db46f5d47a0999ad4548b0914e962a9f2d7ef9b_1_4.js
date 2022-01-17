function twinklespeedyCallbackEvaluateUser(e) {
	mw.config.set('wgPageName', mw.config.get('wgPageName').replace(/_/g, ' '));  // for queen/king/whatever and country!
	var form = (e.target.form ? e.target.form : e.target);

	var value = Twinkle.speedy.resolveCsdValue(e);
	if (!value) {
		return;
	}

	if (value === 'multiple')
	{
		form.style.display = "none"; // give the user a cue that the dialog is being changed
		setTimeout(function() {
			Twinkle.speedy.initDialog(Twinkle.speedy.callback.doMultiple, false, form.dialog);
		}, 150);
		return;
	}

	if (value === 'multiple-finish') {
		value = 'multiple';
	}
	else
	{
		// clear these out, whatever the case, to avoid errors
		Twinkle.speedy.dbmultipleCriteria = [];
		Twinkle.speedy.dbmultipleParameters = [];
	}

	var normalized = Twinkle.speedy.normalizeHash[ value ];

	// for sysops only
	if (['f4', 'f5', 'f6', 'f11'].indexOf(normalized) !== -1) {
		alert("Tagging with F4, F5, F6, and F11 is not possible using the CSD module.  Try using DI instead, or unchecking \"Tag page only\" if you meant to delete the page.");
		return;
	}

	var i;

	// analyse each db-multiple criterion to determine whether to watch the page/notify the creator
	var watchPage = false;
	if (value === 'multiple')
	{
		for (i in Twinkle.speedy.dbmultipleCriteria)
		{
			if (typeof Twinkle.speedy.dbmultipleCriteria[i] === 'string' &&
				Twinkle.getPref('watchSpeedyPages').indexOf(Twinkle.speedy.dbmultipleCriteria[i]) !== -1)
			{
				watchPage = true;
				break;
			}
		}
	}
	else
	{
		watchPage = Twinkle.getPref('watchSpeedyPages').indexOf(normalized) !== -1;
	}

	var notifyuser = false;
	if (value === 'multiple')
	{
		for (i in Twinkle.speedy.dbmultipleCriteria)
		{
			if (typeof Twinkle.speedy.dbmultipleCriteria[i] === 'string' &&
				Twinkle.getPref('notifyUserOnSpeedyDeletionNomination').indexOf(Twinkle.speedy.dbmultipleCriteria[i]) !== -1)
			{
				notifyuser = true;
				break;
			}
		}
	}
	else
	{
		notifyuser = (Twinkle.getPref('notifyUserOnSpeedyDeletionNomination').indexOf(normalized) !== -1) && form.notify.checked;
	}

	var welcomeuser = false;
	if (notifyuser)
	{
		if (value === 'multiple')
		{
			for (i in Twinkle.speedy.dbmultipleCriteria)
			{
				if (typeof Twinkle.speedy.dbmultipleCriteria[i] === 'string' &&
					Twinkle.getPref('welcomeUserOnSpeedyDeletionNotification').indexOf(Twinkle.speedy.dbmultipleCriteria[i]) !== -1)
				{
					welcomeuser = true;
					break;
				}
			}
		}
		else
		{
			welcomeuser = Twinkle.getPref('welcomeUserOnSpeedyDeletionNotification').indexOf(normalized) !== -1;
		}
	}

	var csdlog = false;
	if (Twinkle.getPref('logSpeedyNominations') && value === 'multiple')
	{
		for (i in Twinkle.speedy.dbmultipleCriteria)
		{
			if (typeof Twinkle.speedy.dbmultipleCriteria[i] === 'string' &&
				Twinkle.getPref('noLogOnSpeedyNomination').indexOf(Twinkle.speedy.dbmultipleCriteria[i]) === -1)
			{
				csdlog = true;
				break;
			}
		}
	}
	else
	{
		csdlog = Twinkle.getPref('logSpeedyNominations') && Twinkle.getPref('noLogOnSpeedyNomination').indexOf(normalized) === -1;
	}

	var params = {
		value: value,
		normalized: normalized,
		watch: watchPage,
		usertalk: notifyuser,
		welcomeuser: welcomeuser,
		lognomination: csdlog
	};

	Morebits.simpleWindow.setButtonsEnabled( false );
	Morebits.status.init( form );

	Morebits.wiki.actionCompleted.redirect = mw.config.get('wgPageName');
	Morebits.wiki.actionCompleted.notice = "Tagging complete";

	var wikipedia_page = new Morebits.wiki.page(mw.config.get('wgPageName'), "Tagging page");
	wikipedia_page.setCallbackParameters(params);
	wikipedia_page.load(Twinkle.speedy.callbacks.user.main);
}