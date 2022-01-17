function(err, friend) {
				if (err) res.send(500, 'Error #015: '+err);
				else {
					if (friend.checkins.length>0) output.push(friend);
					count++;
					if (count == user.friends.length) {
						res.send(output.sort(compare).reverse());
					}
				}
			}