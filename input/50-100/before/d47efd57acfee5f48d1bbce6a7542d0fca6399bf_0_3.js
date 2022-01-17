function(r, rt) {
				$('.users-area').empty();
				for(var i in r.message) {
					var p = r.message[i];
					wn.pages.users.profiles[p.name] = p;
					wn.pages.users.render(p);
				}
			}