function (err, bookingId) {
				var text, booking;

				res.render('depositok.ejs', {
					'layout' : 'layout.ejs',
					'req' : req,
					'res' : res,
					'balance' : account.balance(),
					'booking' : account.booking(bookingId)
				});

				kioskLogger.log(userId, account, account.booking(bookingId));

				text = messages.get('kiosk_deposit', {
					'name' : y.user(user).fullName(),
					'deposit' : formatMoney(amount / 100),
					'balance' : formatMoney(account.balance() / 100)
				});

				y.sendMessage(function (error, msg) {
					var thread = y.thread(msg.threadId());
					thread.setProperty('type', 'kiosk_deposit');
					thread.setProperty('status', 'closed');
					y.persistThread(thread);

				}, text, { 'direct_to' : user });
			}