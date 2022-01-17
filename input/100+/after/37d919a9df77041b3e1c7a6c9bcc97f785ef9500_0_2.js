function makeRoleListPerCredit (credit) {
//TODO: This function is UGLY!
				$thisWho  = $who.quickClone().text(credit.name);
				$thisWhat = $what.quickClone().text(credit.what);
				void 0 !== credit.urlN && ($thisWho = $.make('a', { href : 'http://' + credit.urlN }).append($thisWho));
				void 0 !== credit.urlW && ($thisWhat = $.make('a', { href : 'http://' + credit.urlW }).append($thisWhat));
				var $dd = $.make('dd').append($thisWho);
				$thisWhat = $.make('dt').append($thisWhat);
				if (void 0 !== credit.mb) {
					$thisMB = $.make('span', { 'class': 'caaMBCredit' })
					           .appendAll([ $pre.quickClone()
					                      , $.make('a', { href : 'http://musicbrainz.org/user/' + credit.mb })
					                         .text(credit.name.match(/\w+\s/)[0] + '@ MusicBrainz')
					                      , $post.quickClone()
					                      ])
					           .appendTo($dd);
					void 0 !== credit.what ? credits.push($thisWhat, $dd) : credits.push($dd);
				} else if (void 0 !== credit.what) {
					credits.push($thisWhat, $dd);
				} else {
					credits.push($dd);
				}
			}