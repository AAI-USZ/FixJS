function () {
			var userId, account, booking, item;

			userId = req.userId;
			account = accounts.get(userId);
			booking = account.booking(req.params.id);
			item = items.get(booking.itemId());

			res.render('transaction.ejs', {
				'layout' : 'layout.ejs',
				'req' : req,
				'res' : res,
				'account' : account,
				'booking' : booking,
				'item' : item
			});
		}