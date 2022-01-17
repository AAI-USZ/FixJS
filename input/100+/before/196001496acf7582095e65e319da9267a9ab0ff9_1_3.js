function () {
			var userId, recipientId, amount, remark,
				user, recipient,
				sourceAccount, sourceBooking, sourceBookingId,
				targetAccount, targetBooking, targetBookingId,
				text;

			userId = req.userId;
			recipientId = parseInt(req.body.recipient, 10);
			amount = parseInt(req.body.amount * 100, 10);
			remark = req.body.remark;
			user = y.user(userId);
			recipient = y.user(recipientId);

			sourceAccount = accounts.get(userId);
			targetAccount = accounts.get(recipientId);

			sourceBookingId = bookings.uuid();
			targetBookingId = bookings.uuid();

			sourceBooking = new Booking({
				'id' : sourceBookingId,
				'itemId' : null,
				'time' : Date.now(),
				'amount' : amount * -1,
				'name' : 'CHF ' + formatMoney(amount / 100) + ' to ' + recipient.fullName(),
				'description' : remark,
				'relatedBookingId' : targetBookingId,
				'type' : 'send money'
			});

			targetBooking = new Booking({
				'id' : targetBookingId,
				'itemId' : null,
				'time' : Date.now(),
				'amount' : amount,
				'name' : 'CHF ' + formatMoney(amount / 100) + ' from ' + user.fullName(),
				'description' : remark,
				'relatedBookingId' : sourceBookingId,
				'type' : 'send money'
			});

			sourceAccount.book(sourceBooking, function (err, bookingId) {
				res.redirect('/transaction/' + bookingId);

				kioskLogger.log(userId, sourceAccount, sourceAccount.booking(bookingId));
			});

			targetAccount.book(targetBooking, function (err, bookingId) {
				kioskLogger.log(userId, targetAccount, targetAccount.booking(bookingId));

				text = messages.get('kiosk_receivemoney', {
					'name' : recipient.fullName(),
					'senderName' : user.fullName(),
					'amount' : formatMoney(amount / 100),
					'remark' : remark,
					'balance' : formatMoney(targetAccount.balance() / 100)
				});

				y.sendMessage(function (error, msg) {
					var thread = y.thread(msg.threadId());
					thread.setProperty('type', 'kiosk_receivemoney');
					thread.setProperty('status', 'closed');
					y.persistThread(thread);

				}, text, { 'direct_to' : recipientId });
			});
		}