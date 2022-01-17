function(a,b) {
					if(a.logged && !b.logged) return 1
					else if(!a.logged && b.logged) return -1
					else if(a.logged && b.logged) return 0
					// Handle tasks without dates
					if(a.date=="" && b.date !== "") return 1;
					else if(b.date=="" && a.date !== "") return -1;
					else if (a.date == "" && b.date == "") return 0;
					// Sort timestamps
					return a.date -  b.date
				}