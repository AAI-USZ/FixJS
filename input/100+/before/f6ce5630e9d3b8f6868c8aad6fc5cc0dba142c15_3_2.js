function( pageobj ) {
		var params = pageobj.getCallbackParameters();
		var oldText = pageobj.getPageText();

		// abort if mode is auto and form is not empty
		if( pageobj.exists() && params.mode === 'auto' ) {
			Morebits.status.info( 'Warning', 'User talk page not empty; aborting automatic welcome' );
			Morebits.wiki.actionCompleted.event();
			return;
		}
		
		var text = '';
		Status.info( 'Info', 'स्वागत सन्देश सदस्य के वार्ता पन्ने के सबसे ' +
			( Twinkle.getFriendlyPref('topWelcomes') ? 'ऊपर' : 'नीचे' ) +
			' जोड़ा जाएगा।' );/*Will add the welcome template to the top or bottom of the user\'s talk page*/
		if( !Twinkle.getFriendlyPref('topWelcomes') ) {
			text += oldText + '\n';
		}
		
		if( Twinkle.welcome.headingHash[ params.value ] && Twinkle.getFriendlyPref('insertHeadings') ) {
			Status.info( 'Info', 'स्वागत सन्देश के लिये नया अनुभाग बनाया जाएगा' );//Will create a new heading for the welcome
			// strip section header markers from pref, to preserve backwards compatibility
			text += "== " + Twinkle.getFriendlyPref('welcomeHeading').replace(/^\s*=+\s*(.*?)\s*=+$\s*/, "$1") + " ==\n";
		}
		
		Status.info( 'Info', 'Will substitute the {{' + params.value + '}} welcome template' );
		text += '{{subst:' + params.value;
		
		if( Twinkle.welcome.artHash[ params.value ] ) {
			if( Twinkle.getFriendlyPref('insertUsername') && params.value.substring(2,0) !== 'W-' ) {
				Status.info( 'Info', 'स्वागत सन्देश में आपका सदस्य नाम जोड़ा जाएगा' );//Will add your username to the template
				text += '|' + mw.config.get('wgUserName');
			}
			
			if( params.article ) {
				Status.info( 'Info', 'स्वागत सन्देश में लेख की कड़ी जोड़ी जाएगी' );//Will add article link to the template
				text += '|art=' + params.article;
			}
		} else if( Twinkle.welcome.vandalHash[ params.value ] ) {
			if( params.article ) {
				Status.info( 'Info', 'स्वागत सन्देश में लेख की कड़ी जोड़ी जाएगी' );
			}
			text += '|' + params.article;
			
			if( Twinkle.getFriendlyPref('insertUsername') ) {
				Status.info( 'Info', 'स्वागत सन्देश में आपका सदस्य नाम जोड़ा जाएगा' );
				text += '|' + mw.config.get('wgUserName');
			}
		} else if( Twinkle.getFriendlyPref('insertUsername') ) {
			Status.info( 'Info', 'स्वागत सन्देश में आपका सदस्य नाम जोड़ा जाएगा' );
			text += '|' + mw.config.get('wgUserName');
		} 
		
		text += '}}';
		
		if( !Twinkle.welcome.signatureHash[ params.value ] && Twinkle.getFriendlyPref('insertSignature') ) {
			Status.info( 'Info', 'सन्देश के बाद आपके हस्ताक्षर जोड़े जाएँगे' );//Will add your signature after the welcome
			text += ' \n~~~~';
		}
		
		if( Twinkle.getFriendlyPref('topWelcomes') ) {
			text += '\n\n' + oldText;
		}
 
		var summaryText = "सदस्य के वार्ता पन्ने पर " + ( Twinkle.getFriendlyPref('maskTemplateInSummary') ? 'स्वागत सन्देश' : ( '{{[[साँचा:' + params.value + '|' + params.value + ']]}}' ) ) +
			" जोड़ा";
		pageobj.setPageText(text);
		pageobj.setEditSummary(summaryText + Twinkle.getPref('summaryAd'));
		pageobj.setWatchlist(Twinkle.getFriendlyPref('watchWelcomes'));
		pageobj.setCreateOption('recreate');
		pageobj.save();
	}