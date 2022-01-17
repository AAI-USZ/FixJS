function(status) {
			switch(status) {
				case Strophe.Status.CONNECTED:
					Candy.Core.log('[Connection] Connected');
					Candy.Core.Action.Jabber.GetJidIfAnonymous();
					// fall through because the same things need to be done :)
				case Strophe.Status.ATTACHED:
					Candy.Core.log('[Connection] Attached');
					Candy.Core.Action.Jabber.Presence();
					Candy.Core.Action.Jabber.Autojoin();
					Candy.Core.Action.Jabber.GetIgnoreList();
					break;

				case Strophe.Status.DISCONNECTED:
					Candy.Core.log('[Connection] Disconnected');
					break;

				case Strophe.Status.AUTHFAIL:
					Candy.Core.log('[Connection] Authentication failed');
					break;

				case Strophe.Status.CONNECTING:
					Candy.Core.log('[Connection] Connecting');
					break;

				case Strophe.Status.DISCONNECTING:
					Candy.Core.log('[Connection] Disconnecting');
					break;

				case Strophe.Status.AUTHENTICATING:
					Candy.Core.log('[Connection] Authenticating');
					break;

				case Strophe.Status.ERROR:
				case Strophe.Status.CONNFAIL:
					Candy.Core.log('[Connection] Failed (' + status + ')');
					break;

				default:
					Candy.Core.log('[Connection] What?!');
					break;
			}

			$(self).triggerHandler('candy:core.chat.connection', { status: status } );
		}