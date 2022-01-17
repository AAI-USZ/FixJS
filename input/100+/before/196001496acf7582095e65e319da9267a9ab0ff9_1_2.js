function (err, bookingId) {
				var text;

				res.render('withdrawok.ejs', {
					'layout' : 'layout.ejs',
					'req' : req,
					'res' : res,
					'balance' : account.balance()
				});

				kioskLogger.log(userId, account, account.booking(bookingId));

				text = messages.get('kiosk_withdraw', {
					'name' : y.user(user).fullName(),
					'withdrawal' : formatMoney(amount / 100),
					'balance' : formatMoney(account.balance() / 100)
				});

				y.sendMessage(function (error, msg) {
					var thread = y.thread(msg.threadId());
					thread.setProperty('type', 'kiosk_withdrawal');
					thread.setProperty('status', 'closed');
					y.persistThread(thread);

				}, text, { 'direct_to' : user });
			}