function (err, bookingId) {
				res.render('initializeok.ejs', {
					'layout' : 'layout.ejs',
					'req' : req,
					'res' : res,
					'balance' : account.balance()
				});

				kioskLogger.log(userId, account, account.booking(bookingId));

				text = messages.get('kiosk_initialize', {
					'name' : y.user(user).fullName(),
					'balance' : formatMoney(account.balance() / 100)
				});

				y.sendMessage(function (error, msg) {
					var thread = y.thread(msg.threadId());
					thread.setProperty('type', 'kiosk_initialization');
					thread.setProperty('status', 'closed');
					y.persistThread(thread);

				}, text, { 'direct_to' : user });
			}