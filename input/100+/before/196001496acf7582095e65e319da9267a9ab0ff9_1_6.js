function () {
			var userId, user, amount, account,
				itemIds, marks, wait, recString,
				item, mark, rec;

			userId = req.userId;
			user = parseInt(req.body.user, 10);
			amount = parseInt(req.body.amount * 100, 10);
			account = accounts.get(user);

			itemIds = req.body.item;
			marks = req.body.marks;

			wait = itemIds.length - 1;
			recString = String();

			for (var i = 0; i < itemIds.length; i++) {
				item = items.get(itemIds[i]);
				mark = parseInt(marks[i], 10);

				if (mark) {
					rec = {
						'item' : item,
						'marks' : mark,
						'total' : mark * item.price()
					};

					if (i !== 0) { recString += ', '; }
					recString += rec.marks + ' x ' + rec.item.name();

					tallyCarryOver(user, rec, function (err, bookingId) {
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
					});
				}
			}
		}