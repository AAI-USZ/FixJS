function() {
					var name = $('.titleCard').text();
					var country = $('.destination').text();
					var thumbnail = $('.photo-tab img').attr('src');
					var star = parseInt($('.rating a').attr('title').split(' ')[0], 10);
					var rating = null;
					if ($('.rate.os45 img').size()) {
						rating = parseFloat($('.rate.os45 img').attr('alt').split(' ')[0]);
					} else {
						rating = 0;
					}
					var address = $('.address').size() ? $('.address').text() : null;
					var contact = $('.phoneNumber').size() ? $(".phoneNumber").text() : null;
					var rate = $('.product-price.product-price-h201').text();
					var desc = $('.hotel-description .taxes').attr('href');

					var $review = $('.hotel-review');
					var reviews = [];
					for (var i=0;i<$review.size();++i) {
						var $r = $review.eq(i);
						var title = $r.find('h4').text();
						var review = $r.find('.review-description').text();
						var date = $r.find('.date').text();
						var location = $r.find('.location').text();
						var rrating = parseFloat($r.find('.rate img').attr('alt').split('/')[0]);

						reviews.push({
							title: title,
							review: review,
							date: date,
							location: location,
							rating: rrating
						});
					}
					return {
						hotel: {
							name: name,
							country: country,
							thumbnail: thumbnail,
							star: star,
							rating: rating,
							address: address,
							contact: contact,
							rate: rate,
							desc: desc
						},
						reviews: reviews,
						tmp: $('.review-description').size()
					};
				}