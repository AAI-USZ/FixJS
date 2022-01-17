function( e ) {
	
		var tbtarget = e.target.getChecked( "tbtarget" )[0];
		var page = null;
		var section = e.target.section.value;
		var fullUserTalkPageName = mw.config.get("wgFormattedNamespaces")[ mw.config.get("wgNamespaceIds").user_talk ] + ":" + Morebits.getPageAssociatedUser();
	
		if( tbtarget === "usertalk" || tbtarget === "other" ) {
			page = e.target.page.value;
			
			if( tbtarget === "usertalk" ) {
				if( !page ) {
					alert("You must specify the username of the user whose talk page you left a message on.");
					return;
				}
			} else {
				if( !page ) {
					alert("You must specify the full page name when your message is not on a user talk page.");
					return;
				}
			}
		} else if (tbtarget === "notice") {
			page = e.target.noticeboard.value;
		}
	
		var message;
		if (e.target.message) {
			message = e.target.message.value;
		}
	
		Morebits.simpleWindow.setButtonsEnabled( false );
		Morebits.status.init( e.target );
	
		Morebits.wiki.actionCompleted.redirect = fullUserTalkPageName;
		Morebits.wiki.actionCompleted.notice = "Talkback complete; reloading talk page in a few seconds";
	
		var talkpage = new Morebits.wiki.page(fullUserTalkPageName, "Adding talkback");
		var tbPageName = (tbtarget === "mytalk") ? mw.config.get("wgUserName") : page;
	
		var text;
		if ( tbtarget === "notice" ) {
			switch (page) {
				case "an":
					text = "\n\n== " + Twinkle.getFriendlyPref("adminNoticeHeading") + " ==\n";
					text += "{{subst:ANI-notice|thread=" + section + "|noticeboard=Wikipedia:Administrators' noticeboard}} ~~~~";
					talkpage.setEditSummary( "Notice of discussion at [[Wikipedia:Administrators' noticeboard]]" + Twinkle.getPref("summaryAd") );
					break;
				case "an3":
					text = "\n\n{{subst:An3-notice|" + section + "}} ~~~~";
					talkpage.setEditSummary( "Notice of discussion at [[Wikipedia:Administrators' noticeboard/Edit warring]]" + Twinkle.getPref("summaryAd") );
					break;
				case "ani":
					text = "\n\n== " + Twinkle.getFriendlyPref("adminNoticeHeading") + " ==\n";
					text += "{{subst:ANI-notice|thread=" + section + "|noticeboard=Wikipedia:Administrators' noticeboard/Incidents}} ~~~~";
					talkpage.setEditSummary( "Notice of discussion at [[Wikipedia:Administrators' noticeboard/Incidents]]" + Twinkle.getPref("summaryAd") );
					break;
				case "coin":
					text = "\n\n{{subst:Coin-notice|thread=" + section + "}} ~~~~";
					talkpage.setEditSummary( "Notice of discussion at [[Wikipedia:Conflict of interest noticeboard]]" + Twinkle.getPref("summaryAd") );
					break;
				case "drn":
					text = "\n\n{{subst:DRN-notice|thread=" + section + "}} ~~~~";
					talkpage.setEditSummary( "Notice of discussion at [[Wikipedia:Dispute resolution noticeboard]]" + Twinkle.getPref("summaryAd") );
					break;
				case "wqa":
					text = "\n\n{{subst:WQA-notice|thread=" + section + "}} ~~~~";
					talkpage.setEditSummary( "Notice of discussion at [[Wikipedia:Wikiquette assistance]]" + Twinkle.getPref("summaryAd") );
					break;
				default:
					throw "Twinkle.talkback, function callback_evaluate: default case reached";
			}

		} else if ( tbtarget === "mail" ) {
			text = "\n\n==" + Twinkle.getFriendlyPref("mailHeading") + "==\n{{you've got mail|subject=";
			text += section + "|ts=~~~~~}}";

			if( message ) {
				text += "\n" + message + "  ~~~~";
			} else if( Twinkle.getFriendlyPref("insertTalkbackSignature") ) {
				text += "\n~~~~";
			}

			talkpage.setEditSummary("Notification: You've got mail" + Twinkle.getPref("summaryAd"));

		} else {
			//clean talkback heading: strip section header markers, were erroneously suggested in the documentation
			text = "\n\n==" + Twinkle.getFriendlyPref("talkbackHeading").replace( /^\s*=+\s*(.*?)\s*=+$\s*/, "$1" ) + "==\n{{talkback|";
			text += tbPageName;

			if( section ) {
				text += "|" + section;
			}
	
			text += "|ts=~~~~~}}";
	
			if( message ) {
				text += "\n" + message + "  ~~~~";
			} else if( Twinkle.getFriendlyPref("insertTalkbackSignature") ) {
				text += "\n~~~~";
			}
	
			talkpage.setEditSummary("Talkback ([[" + (tbtarget === "other" ? "" : "User talk:") + tbPageName +
				(section ? ("#" + section) : "") + "]])" + Twinkle.getPref("summaryAd"));
		}
	
		talkpage.setAppendText( text );
		talkpage.setCreateOption("recreate");
		talkpage.setMinorEdit(Twinkle.getFriendlyPref("markTalkbackAsMinor"));
		talkpage.setFollowRedirect( true );
		talkpage.append();
	}