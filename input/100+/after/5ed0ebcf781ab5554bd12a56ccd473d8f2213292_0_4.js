function(subject, message) {
			if(Candy.View.getCurrent().roomJid) { // Simply dismiss admin message if no room joined so far. TODO: maybe we should show those messages on a dedicated pane?
				var html = Mustache.to_html(Candy.View.Template.Chat.adminMessage, {
					subject: subject,
					message: message,
					sender: $.i18n._('administratorMessageSubject'),
					time: Candy.Util.localizedTime(new Date().toGMTString())
				});
				$('#chat-rooms').children().each(function() {
					self.Room.appendToMessagePane($(this).attr('data-roomjid'), html);
				});
				self.Room.scrollToBottom(Candy.View.getCurrent().roomJid);

				var evtData = {'subject' : subject, 'message' : message};

				Candy.View.Event.Chat.onAdminMessage(evtData);

				/* new event system call */
				$(Candy.View.Pane.Chat).triggerHandler('adminmessage', [evtData]);
			}
		}