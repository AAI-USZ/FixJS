function(pageobj) {
			var text = pageobj.getPageText();
			var params = pageobj.getCallbackParameters();

			pageobj.setPageText((params.noinclude ? "<noinclude>{{हहेच अन्य" : "{{हहेच अन्य") + '|कारण=' params.reason + (params.noinclude ? "}}</noinclude>" : "}}\n") + text);
			pageobj.setEditSummary("हटाने हेतु चर्चा के लिये नामांकन; देखें [[वि:पृष्ठ हटाने हेतु चर्चा/अन्य/" + mw.config.get('wgPageName') + "|नामांकन पृष्ठ]]।" + Twinkle.getPref('summaryAd'));
			switch (Twinkle.getPref('xfdWatchPage')) {
				case 'yes':
					pageobj.setWatchlist(true);
					break;
				case 'no':
					pageobj.setWatchlistFromPreferences(false);
					break;
				default:
					pageobj.setWatchlistFromPreferences(true);
					break;
			}
			pageobj.setCreateOption('recreate');  // it might be possible for a file to exist without a description page
			pageobj.save();
		}