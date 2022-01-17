function(){
			var caption = $(this).find('.caption');var selectedli = $(".filter .selected");
		    if($(selectedli).attr('data-value') != "youtube")
			{
			    var feedobj = $(this);
			    if(caption.html()!="Click to Unsubscribe")
			    {
				    var feed_url = $(this).attr('data-id');
					$('.caption',this).html('<img src="img/addfeed.gif">'+'<br>'+'Subscribing. Please Wait...');
				    $('.caption',this).animate({'opacity': 1, 'margin-top': -80 }, 50);
				
					$('img',this).animate({'opacity': 0.1}, 200);
					$('.caption img',this).animate({'opacity': 1}, 0);
					FeedViewer.sendForSubscription(feed_url,feedobj);
			    }
			    else {
				    url = $(this).attr('data-id');
				    Reader.unsubscribe(url,function(){
					    showUnsubscribedFeed(feedobj);
				    });
			    }
		   }
		}