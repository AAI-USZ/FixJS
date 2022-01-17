function(pageobj) {
			var text = pageobj.getPageText();
			var params = pageobj.getCallbackParameters();

			pageobj.setPageText((params.noinclude ? "<noinclude>{{हहेच साँचा" : "{{हहेच साँचा") + '|कारण=' params.reason + (params.noinclude ? "}}</noinclude>" : "}}\n") + text);
			pageobj.setEditSummary("हटाने हेतु चर्चा के लिये नामांकन; देखें [[वि:पृष्ठ हटाने हेतु चर्चा/साँचे/" + mw.config.get('wgTitle') + "|नामांकन पृष्ठ]]।" + Twinkle.getPref('summaryAd'));
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
			pageobj.setCreateOption('nocreate');
			pageobj.save();
		}