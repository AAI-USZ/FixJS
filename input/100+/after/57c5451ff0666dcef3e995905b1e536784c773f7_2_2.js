function()

	{

		/* Render the Addfeeds Section */

		FeedViewer.renderAddFeeds();

		

		/*Youtube suggestion click event : Get results for the clicked search result */

		$("#youtubeSuggestions li").live('click',function(){

			var query = $(this).text();

			$("#youtubeSuggestions").css('display','none');

			$("#searchbox").find('input')[1].value =query;

			FeedEngine.getVideos(query);

		});

		

		/* Attach Event handlers for Hover on the feedicons */

		$('.grimg li').hover(function() {

			var feedobj = $(this);

			var selectedli = $(".filter .selected");

			$('.fdname', this).css('text-decoration', 'underline');

		    if($(selectedli).attr('data-value') != "youtube"){

			    var feed_url = $(this).attr('data-id');

				

				DbManager.checkSubscription(feed_url,function(isSubscribed){

					if(isSubscribed == 1){

						console.log("Hover in  : Feed subscribed");

						/* Feed Already subscribed. Show the message to unsubscribe*/

						$('.caption',feedobj).fadeOut(100,function(){

						$(this).html('Click to Unsubscribe').css('margin-top','-55px')}).stop(true, true).fadeIn(50);	

					}else{

						/* Feed not subscribed. Show the message to subscribe.*/

						console.log("Hover in : Feed unsubscribed");

						$('.caption',feedobj).stop(true,true).animate({'opacity': 1,'margin-top': -60}, 50);

						$('img',feedobj).stop(true,true).animate({'opacity': 0.1}, 100);

					}

				});

			}

		},function() {

				var feedobj = $(this);

				var selectedli = $(".filter .selected");

				$('.fdname', this).css('text-decoration', 'none')

		        if($(selectedli).attr('data-value') != "youtube")

				{

			    	var feed_url = $(this).attr('data-id');

					DbManager.checkSubscription(feed_url,function(isSubscribed){

						if(isSubscribed == 1){

							console.log("Hover out  : Feed subscribed");

							$('.caption',feedobj).fadeOut(100,function(){

								$(this).html('You are subscribed to '+$(this).parent().find('.feedimage').attr('title')+'<br>'

									 +'<img class="subscbdimg" src="img/done.png">').css('margin-top','-60px')}).stop(0,true, true).fadeIn(50);

						} 

						else if($('.caption',feedobj).html()== 'Click me to subscribe to '+$('img',feedobj).attr('title'))

						{

							console.log("Hover out  : Feed subscribed");

							$('.caption',feedobj).stop(0,true,true).animate({'opacity': 0}, 50);

							$('img',feedobj).stop(0,true,true).animate({'opacity': 1}, 200);		

						}

					});

				}

			});

		

		// Attach handlers for click on feedIcons

		$(".grimg li").live('click',function(){

			var feedobj = $(this);

			var caption = $(this).find('.caption');var selectedli = $(".filter .selected");

		    if($(selectedli).attr('data-value') != "youtube")

			{

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

						FeedViewer.renderMyFeeds();

					    showUnsubscribedFeed(feedobj);

				    });

			    }

		   }

		});

		$(".filter a").live('click',function(){

				

				if($(this).attr('class') == 'selected')

					return;

				$(".filter a").removeClass('selected');

				var multiple=$(this).attr('class');

				$(this).addClass('selected');

				var field = $(this).attr('data-value');

				if(field == "youtube"){

					

					$('#addFeedsForm img').attr('src','img/search-dark.png')

					$("#error-message").html("Search in the SearchBox above for Youtube Videos.");

					$('#addFeedsForm').find('span').text('Search Youtube:');}

				else{

					$('#addFeedsForm img').attr('src','img/add.png')

					$("#error-message").html("Click on the feed from the categories given below or enter the URL of the desired feed of your wish");

					$('#addFeedsForm').find('span').text('Add Feeds:');

					}

				var finval=multiple*950*(-1)+40;

				$("#container").animate({'margin-left': finval}, 300);

		});

        // Youtube results captions

		$(".videolistitem").live('mouseenter',function(){

			$('.utubecaption',this).stop(true,true).animate({'opacity': 1, 'z-index':100000}, 50);

			$('img',this).stop(true,true).animate({'opacity': 0.2, 'z-index':10}, 100)});

		$(".videolistitem").live('mouseleave',function(){

			$('.utubecaption',this).stop(0,true,true).animate({'opacity': 0, 'z-index':100000}, 50);

			$('img',this).stop(0,true,true).animate({'opacity': 1, 'z-index':10}, 100);});

				

			

		$("#feedback").click(function(){pokki.openURLInDefaultBrowser("http://www.codeblues.in/softwares/feedreader.php");})	}