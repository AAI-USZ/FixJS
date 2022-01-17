function(a,b) {
					if(a.logged && !b.logged) return 1
					else if(!a.logged && b.logged) return -1
					else if(a.logged && b.logged) return 0
					return priorityWorth[b.priority] - priorityWorth[a.priority]
				}