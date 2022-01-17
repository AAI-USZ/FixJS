function()

	{

		FeedViewer.initialiseAddFeeds();

		FeedViewer.initialiseMyFeeds();

		YoutubeManager.initialiseYoutubeFeeds();

		ReaderViewer.initialise();

		ReaderViewer.initialiseHeadlineView();

		GoogleReader.initialise();

		Keyboard.initialise();

		//Initialise Youtube Autosuggest

			jQTubeUtil.init({

		key: "AI39si7Br60Mhmvnb0iGT_DckKttQdd_8ghDOs_UQIcmb3wDhwAnZlkPe9lqp1llOv9rZNGqdKcdP8BdHRDOMaY4Mu0Xh3op9g",

		orderby: "viewCount",  // *optional -- "viewCount" is set by default

		time: "this_month",   // *optional -- "this_month" is set by default

		maxResults: 5   // *optional -- defined as 10 results by default

	});

		

		$("#tomyfeedsbtn").click(function(){switchToMyFeeds();});

		$("#tomyfeedsbtn2").click(function(){switchToMyFeeds();});

		$(".toaddfeedsbtn").click(function(){modes.switchToMode(0);});

		

		$("#addFeedsForm").submit(function(){

			console.log("Form submitted");

		var selectedli = $(".filter .selected");

		if($(selectedli).attr('data-value') == "youtube")

		{

			YoutubeManager.getVideos($(this).find("input")[1].value);

			return;

			

		}

		var feed_url = encodeURI($(this).find("input")[1].value);

		console.log(feed_url);

		var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

		if(regexp.test(feed_url))

		{

			DbManager.checkSubscription(feed_url,function(isSubscribed){

				if(isSubscribed != 1){

					$('#loadingurl').css('opacity',1);

					FeedViewer.sendForSubscription(feed_url,null);

				}else{

					$('#loadingurl').css('opacity',0);

					showMessage("<b>You are already subscribed to this feed. Go to Myfeeds page to view the feeds.</b>");

				}

			})

		}

		else{

			$('#loadingurl').css('opacity',0);

			$("#searchbox").find('input')[1].value = "";

			//YoutubeManager.searchFeed(feed_url);

			showMessage("<b>Please Enter a Valid Url!!!</b>");

		}

		 });

		

	}