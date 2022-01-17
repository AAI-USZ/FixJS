function ins() {
			if (!obj['rating_overall']) obj['rating_overall'] = null;
			if (!obj['rating_food']) obj['rating_food'] = null;
			if (!obj['rating_ambience']) obj['rating_ambience'] = null;
			if (!obj['rating_value']) obj['rating_value'] = null;
			if (!obj['rating_service']) obj['rating_service'] = null;
			mysql.query('INSERT INTO hgw_restaurant_reviews(hgw_restaurant_id, recommend, price_pax, rating_overall, rating_food, rating_ambience, rating_value, rating_service, poster, title, review_date, review, must_tries, mined_on) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
						[
							restaurant_id,
							obj['recommend'],
							obj['price_pax'],
							obj['rating_overall'],
							obj['rating_food'],
							obj['rating_ambience'],
							obj['rating_value'],
							obj['rating_service'],
							obj['poster'],
							obj['title'],
							obj['review_date'],
							obj['review'],
							obj['must_tries'],
							time
						],
						function(err, doc) {
							if (err) {
								global.error('mysql', err);
							}
							cb(err, doc);
						});
		}