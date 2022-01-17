function (err, bookingId) {
						var stock, text;

						kioskLogger.log(userId, account, account.booking(bookingId));

						if (rec.item.isStockable()) {
							stock = stocks.get(rec.item.id());
							stock.update({
								'bookingId' : bookingId,
								'type' : 'consumption',
								'change' : rec.item.ration() * rec.marks * -1
							});
						}

						if (!--wait) {
							res.render('tallyok.ejs', {
								'layout' : 'layout.ejs',
								'req' : req,
								'res' : res,
								'balance' : account.balance()
							});

							text = messages.get('kiosk_tally', {
								'name' : y.user(user).fullName(),
								'balance' : formatMoney(account.balance() / 100),
								'recs' : recString
							});

							y.sendMessage(function (error, msg) {
								var thread = y.thread(msg.threadId());
								thread.setProperty('type', 'kiosk_tally_carry_over');
								thread.setProperty('status', 'closed');
								y.persistThread(thread);

							}, text, { 'direct_to' : user });
						}
					}