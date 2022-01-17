function friendlytalkbackCallbackEvaluate(e) {
	var tbtarget = e.target.getChecked( 'tbtarget' )[0];
	var page = null;
	var section = e.target.section.value;
	if( tbtarget === 'usertalk' || tbtarget === 'other' ) {
		page = e.target.page.value;
		
		if( tbtarget === 'usertalk' ) {
			if( !page ) {
				alert( 'आपको उस सदस्य का नाम बताना होगा जिसके वार्ता पन्ने पर आपने सन्देश छोड़ा है।' );
				return;
			}
		} else {
			if( !page ) {
				alert( 'यदि आपका सन्देश सदस्य वार्ता पन्ने की जगह किसी और पन्ने पर है तो आपको उस पन्ने का पूरा नाम बताना होगा।' );
				return;
			}
		}
	} else if (tbtarget === "an") {
		page = 'विकिपीडिया:प्रबंधक सूचनापट';
	}

	var message;
	if (e.target.message) {
		message = e.target.message.value;
	}

	SimpleWindow.setButtonsEnabled( false );
	Status.init( e.target );

	Wikipedia.actionCompleted.redirect = mw.config.get('wgPageName');
	Wikipedia.actionCompleted.notice = "सन्देश दे दिया, वार्ता पन्ना कुछ ही क्षणों में रीलोड होगा";

	var talkpage = new Wikipedia.page(mw.config.get('wgPageName'), "सन्देश जोड़ा जा रहा है");
	var tbPageName = (tbtarget === 'mytalk') ? mw.config.get('wgUserName') : page;

	var text;
	if ( tbtarget === "an" ) {
		text = "\n{{subst:ANI-notice|thread=";
		text += section + "|noticeboard=" + tbPageName + "}} --~~~~";

		talkpage.setEditSummary("प्रबंधक सूचनापट पर चर्चा का नोटिस" + Twinkle.getPref('summaryAd'));
	} else {
		//clean talkback heading: strip section header markers, were erroneously suggested in the documentation
		text = '\n==' + Twinkle.getFriendlyPref('talkbackHeading').replace(/^\s*=+\s*(.*?)\s*=+$\s*/, "$1") + '==\n{{सन्देश|';
		text += tbPageName;

			if( section ) {
				text += '|' + section;
			}
	
			text += '|ts=~~~~~}}';
	
			if( message ) {
				text += '\n' + message + '  ~~~~';
			} else if( Twinkle.getFriendlyPref('insertTalkbackSignature') ) {
				text += '\n~~~~';
		}
	
		talkpage.setEditSummary("सन्देश [[" + (tbtarget === 'other' ? '' : 'सदस्य वार्ता:') + tbPageName +
			(section ? ('#' + section) : '') + "]] पर" + Twinkle.getPref('summaryAd'));
	}

	talkpage.setAppendText(text);
	talkpage.setCreateOption('recreate');
	talkpage.setMinorEdit(Twinkle.getFriendlyPref('markTalkbackAsMinor'));
	talkpage.setFollowRedirect(true);
	talkpage.append();
}