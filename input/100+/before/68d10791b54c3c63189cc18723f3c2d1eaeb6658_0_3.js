function(){
		
			$("#myfeedsdiv .myfeedlist").empty();
			var list = FeedController.getMyFeeds();
			if(list == null) return;
			for(var i =0;i<list.length;i++)
			{
				var feed = new LocalStore(list[i]);
				var feedinfo = feed.get(list[i]);
				
				if(feedinfo == null){
					i++;continue;
				}
				var title = JSON.parse(feedinfo).title;
				if(GoogleReader.hasAuth() == true){
					var unreadCount = JSON.parse(feedinfo).unreadCount;
				}
				var imagesource=getDomain(list[i])+"/favicon.ico";
				var randomnumber=Math.floor(Math.random()*5);
				if(GoogleReader.hasAuth() == true)
					var countstr = "<div class='readunread'>"+unreadCount+"</div></div></li>";
				else
					var countstr = "";
				$("#myfeedsdiv .myfeedlist").append("<li><div class='feedl color"+randomnumber+"' rel = " +list[i] +" >"
					+"<div class='unsub'></div>"+"<div class='readmarker'></div>"+"<img class='faviconimg' src='"+imagesource+"'/><p>"+title.substring(0,25)+"</p>"+countstr);
			}
			/* Put the default imaage if the favicon image is not found*/
			$('.faviconimg').error(function() {
				$(this).attr("src", "img/defaultfavicon.png");
			});
	}