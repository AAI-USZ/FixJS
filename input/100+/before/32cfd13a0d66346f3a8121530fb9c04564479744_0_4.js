function()

	{

		FeedViewer.renderMyFeeds();

		

		//Attach handler forunsubscribing feeds

		$(".feedl").live('click',function(event){

				event.stopPropagation();

				$("#loadingScreen").css('visibility','visible').css('display','block');

				var url = ($(this).attr("rel"));

				Reader.getFeedContent(url,null,ReaderViewer.showFetchError);

		});

		

		$('.videolistitem').live('click', function(){

				

				var link =  $(this).attr('link');console.log(link);

				$("#forscroll").animate({'margin-left': -950}, 300);

				

				if($('#fwdbutton').css('display')=='none')

					$('#fwdbutton').css('display','block');

				

				if($('#closevideo').css('display')=='none')

					$('#closevideo').css('display','block');

				

				if($('.youtube-player').attr('src')==link){

				return;

					}

					else

					{FeedViewer.showVideo(link);

						$('.nowplaying').css('display','none');	

						$(this).find('.nowplaying').css('display','block');			

				return;

					$('#firstpage')}

			});

			$('#closevideo').live('click',function (){

				$('.youtube-player').attr('src',"");

				$('.nowplaying').css('display','none');

				$('#fwdbutton').css('display','none');

				$("#forscroll").animate({'margin-left': 0}, 300);

				});

			$('#fwdbutton').live('click',function(){

				$("#forscroll").animate({'margin-left': -950}, 300);

				});

		$('#backbutton').live('click', function(){

			$("#forscroll").animate({'margin-left': 0}, 300);

		});

		

		$('#vcatlist a').live('click',function(){

				

				if($(this).attr('class') == 'selected')

					return;

				$("#vcatlist a").removeClass('selected');

				$("#videosbox").css('background','url(img/feedsload.gif) 280px 150px no-repeat #111');			

				var multiple=$(this).attr('class');

				$(this).addClass('selected');

					$('.videoslist').empty();

				var field = $(this).attr('data-value');

				FeedEngine.showVideos(field);

		});

		

		/* Attach handlers for hover on unsubscribe link */

		$('.unsub').live('mouseenter',function(){

			$(this).css('opacity','1');		

			});

		$('.unsub').live('mouseleave',function(){

				$(this).css('opacity','0.3');

			});

		

		/* Attach Handlers for click on the Unsubscribe link */

		$(".unsub").live('click',function(event){

		    event.stopPropagation();

			//console.log("Unsub button clicked");

			if(modes.currentmode == modes.myFeedsMode)

				url = $(this).parent().attr('rel');

			var obj = $(this);

			Reader.unsubscribe($(this).parent().attr('rel'),function(){

					console.log("Unsubscribing from feed\n");

					$(obj).parent().hide("fast",function(){$(this).parent().remove();});

					$("#stage li").each(function(){

					if($(this).attr('data-id') == url)

						showUnsubscribedFeed($(this));

					});

			});

		});

		

		/* Attach handlers for click on the MarkedRead thing*/

		$(".readmarker").live('click',function(event){

			var feedobj = $(this);

			event.stopPropagation();

			var feedUrl = $(this).parent().attr('rel');

			GoogleReader.markAllAsRead(feedUrl,function(){

				console.log("Marked read successfully");

				$(feedobj).find('img').attr('src','img/marked2.png');

				$(feedobj).parent().find('.readunread').html("0");

			});

		});

		

	}