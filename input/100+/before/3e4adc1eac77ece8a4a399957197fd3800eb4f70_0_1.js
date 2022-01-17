function(i,t){
			var matchAuthor = (""+$(t).data("author")+"").match(keyword);
			var matchTitle = (""+$(t).data("title")+"").match(keyword);

			if (matchAuthor || matchTitle)
				$(t).show(500);
			else
				$(t).hide(500);
		}