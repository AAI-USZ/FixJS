function( self ) {
		var xmlDoc = self.responseXML;

		var lastrevid = parseInt( $(xmlDoc).find('page').attr('lastrevid'), 10);
		var touched = $(xmlDoc).find('page').attr('touched');
		var starttimestamp = $(xmlDoc).find('page').attr('starttimestamp');
		var edittoken = $(xmlDoc).find('page').attr('edittoken');
		var lastuser = $(xmlDoc).find('rev').attr('user');

		var revs = $(xmlDoc).find('rev');

		if( revs.length < 1 ) {
			self.statelem.error( 'We have less than one additional revision, thus impossible to revert' );
			return;
		}
		var top = revs[0];
		if( lastrevid < self.params.revid ) {
			Status.error( 'Error', [ 'The most recent revision ID received from the server, ', htmlNode( 'strong', lastrevid ), ', is less than the ID of the displayed revision. This could indicate that the current revision has been deleted, the server is lagging, or that bad data has been received. Will stop proceeding at this point.' ] );
			return;
		}
		var index = 1;
		if( self.params.revid !== lastrevid  ) {
			Status.warn( 'Warning', [ 'Latest revision ', htmlNode( 'strong', lastrevid ), ' doesn\'t equal our revision ', htmlNode( 'strong', self.params.revid ) ] );
			if( lastuser === self.params.user ) {
				switch( self.params.type ) {
				case 'vand':
					Status.info( 'Info', [ 'Latest revision was made by ', htmlNode( 'strong', self.params.user ) , '. As we assume vandalism, we continue to revert' ]);
					break;
				case 'agf':
					Status.warn( 'Warning', [ 'Latest revision was made by ', htmlNode( 'strong', self.params.user ) , '. As we assume good faith, we stop reverting, as the problem might have been fixed.' ]);
					return;
				default:
					Status.warn( 'Notice', [ 'Latest revision was made by ', htmlNode( 'strong', self.params.user ) , ', but we will stop reverting anyway.' ] );
					return;
				}
			}
			else if(self.params.type === 'vand' && 
					Twinkle.fluff.whiteList.indexOf( top.getAttribute( 'user' ) ) !== -1 && revs.length > 1 &&
					revs[1].getAttribute( 'pageId' ) === self.params.revid) {
				Status.info( 'Info', [ 'Latest revision was made by ', htmlNode( 'strong', lastuser ), ', a trusted bot, and the revision before was made by our vandal, so we proceed with the revert.' ] );
				index = 2;
			} else {
				Status.error( 'Error', [ 'Latest revision was made by ', htmlNode( 'strong', lastuser ), ', so it might have already been reverted, stopping  reverting.'] );
				return;
			}

		}

		if( Twinkle.fluff.whiteList.indexOf( self.params.user ) !== -1  ) {
			switch( self.params.type ) {
			case 'vand':
				Status.info( 'Info', [ 'Vandalism revert was chosen on ', htmlNode( 'strong', self.params.user ), '. As this is a whitelisted bot, we assume you wanted to revert vandalism made by the previous user instead.' ] );
				index = 2;
				vandal = revs[1].getAttribute( 'user' );
				self.params.user = revs[1].getAttribute( 'user' );
				break;
			case 'agf':
				Status.warn( 'Notice', [ 'Good faith revert was chosen on ', htmlNode( 'strong', self.params.user ), '. This is a whitelisted bot, it makes no sense at all to revert it as a good faith edit, will stop reverting.' ] );
				return;
			case 'norm':
				/* falls through */
			default:
				var cont = confirm( 'Normal revert was chosen, but the most recent edit was made by a whitelisted bot (' + self.params.user + '). Do you want to revert the revision before instead?' );
				if( cont ) {
					Status.info( 'Info', [ 'Normal revert was chosen on ', htmlNode( 'strong', self.params.user ), '. This is a whitelisted bot, and per confirmation, we\'ll revert the previous revision instead.' ] );
					index = 2;
					self.params.user = revs[1].getAttribute( 'user' );
				} else {
					Status.warn( 'Notice', [ 'Normal revert was chosen on ', htmlNode( 'strong', self.params.user ), '. This is a whitelisted bot, but per confirmation, revert on top revision will proceed.' ] );
				}
				break;
			}
		}
		var found = false;
		var count = 0;

		for( var i = index; i < revs.length; ++i ) {
			++count;
			if( revs[i].getAttribute( 'user' ) != self.params.user ) {
				found = i;
				break;
			}
		}

		if( ! found ) {
			self.statelem.error( [ 'No previous revision found. Perhaps ', htmlNode( 'strong', self.params.user ), ' is the only contributor, or that the user has made more than ' + Twinkle.getPref('revertMaxRevisions') + ' edits in a row.' ] );
			return;
		}

		if( ! count ) {
			Status.error( 'Error', "We were to revert zero revisions. As that makes no sense, we'll stop reverting this time. It could be that the edit has already been reverted, but the revision ID was still the same." );
			return;
		}

		var good_revision = revs[ found ];
		var userHasAlreadyConfirmedAction = false;
		if (self.params.type !== 'vand' && count > 1) {
			if ( !confirm( self.params.user + ' has made ' + count + ' edits in a row. Are you sure you want to revert them all?') ) {
				Status.info( 'Notice', 'Stopping reverting per user input' );
				return;
			}
			userHasAlreadyConfirmedAction = true;
		}

		self.params.count = count;

		self.params.goodid = good_revision.getAttribute( 'revid' );
		self.params.gooduser = good_revision.getAttribute( 'user' );

		self.statelem.status( [ ' revision ', htmlNode( 'strong', self.params.goodid ), ' that was made ', htmlNode( 'strong', count ), ' revisions ago by ', htmlNode( 'strong', self.params.gooduser ) ] );

		var summary, extra_summary, userstr, gooduserstr;
		switch( self.params.type ) {
		case 'agf':
			extra_summary = prompt( "An optional comment for the edit summary:", "" );
			if (extra_summary === null)
			{
				self.statelem.error( 'Aborted by user.' );
				return;
			}
			userHasAlreadyConfirmedAction = true;

			userstr = self.params.user;
			summary = "Reverted [[WP:AGF|good faith]] edits by [[Special:Contributions/" + userstr + "|" + userstr + "]] ([[User talk:" + 
				userstr + "|talk]])" + Twinkle.fluff.formatSummaryPostfix(extra_summary) + Twinkle.getPref('summaryAd');
			break;

		case 'vand':

			userstr = self.params.user;
			gooduserstr = self.params.gooduser;
			summary = "Reverted " + self.params.count + (self.params.count > 1 ? ' edits' : ' edit') + " by [[Special:Contributions/" +
				userstr + "|" + userstr + "]] ([[User talk:" + userstr + "|talk]]) identified as [[WP:VAND|vandalism]] to last revision by " +
				gooduserstr + "." + Twinkle.getPref('summaryAd');
			break;

		case 'norm':
			/* falls through */
		default:
			if( Twinkle.getPref('offerReasonOnNormalRevert') ) {
				extra_summary = prompt( "An optional comment for the edit summary:", "" );
				if (extra_summary === null)
				{
					self.statelem.error( 'Aborted by user.' );
					return;
				}
				userHasAlreadyConfirmedAction = true;
			}

			userstr = self.params.user;
			summary = "Reverted " + self.params.count + (self.params.count > 1 ? ' edits' : ' edit') + " by [[Special:Contributions/" + 
				userstr + "|" + userstr + "]] ([[User talk:" + userstr + "|talk]])" + Twinkle.fluff.formatSummaryPostfix(extra_summary) +
				Twinkle.getPref('summaryAd');
			break;
		}

		if (Twinkle.getPref('confirmOnFluff') && !userHasAlreadyConfirmedAction && !confirm("Reverting page: are you sure?")) {
			self.statelem.error( 'Aborted by user.' );
			return;
		}

		var query;
		if( (!self.params.autoRevert || Twinkle.getPref('openTalkPageOnAutoRevert')) && 
				Twinkle.getPref('openTalkPage').indexOf( self.params.type ) !== -1 &&
				mw.config.get('wgUserName') !== self.params.user ) {
			Status.info( 'Info', [ 'Opening user talk page edit form for user ', htmlNode( 'strong', self.params.user ) ] );
			
			query = {
				'title': 'User talk:' + self.params.user,
				'action': 'edit',
				'preview': 'yes',
				'vanarticle': self.params.pagename.replace(/_/g, ' '),
				'vanarticlerevid': self.params.revid,
				'vanarticlegoodrevid': self.params.goodid,
				'type': self.params.type,
				'count': self.params.count
			};

			switch( Twinkle.getPref('userTalkPageMode') ) {
			case 'tab':
				window.open( mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?' + QueryString.create( query ), '_tab' );
				break;
			case 'blank':
				window.open( mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?' + QueryString.create( query ), '_blank', 'location=no,toolbar=no,status=no,directories=no,scrollbars=yes,width=1200,height=800' );
				break;
			case 'window':
				/* falls through */
			default:
				window.open( mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?' + QueryString.create( query ), 'twinklewarnwindow', 'location=no,toolbar=no,status=no,directories=no,scrollbars=yes,width=1200,height=800' );
				break;
			}
		}
		
		query = {
			'action': 'edit',
			'title': self.params.pagename,
			'summary': summary,
			'token': edittoken,
			'undo': lastrevid,
			'undoafter': self.params.goodid,
			'basetimestamp': touched,
			'starttimestamp': starttimestamp,
			'watchlist' :  Twinkle.getPref('watchRevertedPages').indexOf( self.params.type ) != -1 ? 'watch' : undefined,
			'minor': Twinkle.getPref('markRevertedPagesAsMinor').indexOf( self.params.type ) != -1  ? true : undefined
		};

		Wikipedia.actionCompleted.redirect = self.params.pagename;
		Wikipedia.actionCompleted.notice = "Reversion completed";

		var wikipedia_api = new Wikipedia.api( 'Saving reverted contents', query, Twinkle.fluff.callbacks.complete, self.statelem);
		wikipedia_api.params = self.params;
		wikipedia_api.post();

	}