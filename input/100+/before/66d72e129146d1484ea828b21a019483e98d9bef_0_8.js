function(obj, args) {
			if(args.type === 'connection') {
				switch(args.status) {
					case Strophe.Status.CONNECTING:
					case Strophe.Status.AUTHENTICATING:
						Candy.View.Pane.Chat.Modal.show($.i18n._('statusConnecting'), false, true);
						break;

					case Strophe.Status.ATTACHED:
					case Strophe.Status.CONNECTED:
						Candy.View.Pane.Chat.Modal.show($.i18n._('statusConnected'));
						Candy.View.Pane.Chat.Modal.hide();
						break;

					case Strophe.Status.DISCONNECTING:
						Candy.View.Pane.Chat.Modal.show($.i18n._('statusDisconnecting'), false, true);
						break;

					case Strophe.Status.DISCONNECTED:
						var presetJid = Candy.Core.isAnonymousConnection() ? Strophe.getDomainFromJid(Candy.Core.getUser().getJid()) : null;
						Candy.View.Pane.Chat.Modal.showLoginForm($.i18n._('statusDisconnected'), presetJid);
						Candy.View.Event.Chat.onDisconnect();
						break;

					case Strophe.Status.AUTHFAIL:
						Candy.View.Pane.Chat.Modal.showLoginForm($.i18n._('statusAuthfail'));
						Candy.View.Event.Chat.onAuthfail();
						break;

					default:
						Candy.View.Pane.Chat.Modal.show($.i18n._('status', args.status));
						break;
				}
			} else if(args.type === 'message') {
				Candy.View.Pane.Chat.adminMessage((args.subject || ''), args.message);
			} else if(args.type === 'chat' || args.type === 'groupchat') {
				// use onInfoMessage as infos from the server shouldn't be hidden by the infoMessage switch.
				Candy.View.Pane.Chat.onInfoMessage(Candy.View.getCurrent().roomJid, (args.subject || ''), args.message);
			}
		}