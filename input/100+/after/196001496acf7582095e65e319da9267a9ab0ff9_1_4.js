function () {
			var userId, account, booking, item, sender, recipient;

			userId = req.userId;
			account = accounts.get(userId);
			booking = account.booking(req.params.id);
			item = items.get(booking.itemId());
			sender = y.user(booking.sender());
			recipient = y.user(booking.recipient());

			res.render('transaction.ejs', {
				'layout' : 'layout.ejs',
				'req' : req,
				'res' : res,
				'account' : account,
				'booking' : booking,
				'item' : item, 
				'sender' : sender,
				'recipient' : recipient
			});
		}