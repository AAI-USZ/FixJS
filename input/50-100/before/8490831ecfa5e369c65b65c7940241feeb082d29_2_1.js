function(a,b) {
					var worth = { none: 0, low: 1, medium: 2, high: 3 };
					if(a.logged && !b.logged) return 1
					else if(!a.logged && b.logged) return -1
					else if(a.logged && b.logged) return 0
					return worth[b.priority] - worth[a.priority]
				}