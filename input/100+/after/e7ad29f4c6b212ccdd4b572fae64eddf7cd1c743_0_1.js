function() {
				var array = [],
						lnBefore,
						lnAfter,
						ss = [];

				if (!array.splice) return false;

				//start testing for IE8 splice bug (http://social.msdn.microsoft.com/Forums/lv-LV/iewebdevelopment/thread/6e946d03-e09f-4b22-a4dd-cd5e276bf05a)
				for(var j=0; j<20; j++) {
					ss.push("A");
				}

				ss.splice(15, 0, "F", "F", "F", "F", "F","F","F","F","F","F","F","F","F","F","F","F","F","F","F","F","F");
				lnBefore = ss.length;
				ss.splice(13, 0, "XXX"); //if IE8 used, length of ss will be 55 instead of 42..
				lnAfter = ss.length;

				if (lnBefore+1 != lnAfter) return false;
				else return true;
			}