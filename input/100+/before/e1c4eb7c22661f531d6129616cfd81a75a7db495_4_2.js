function(response){
		//check if the btt preference is set
		if(response.ls.btt == VoluniAppPref.BTT_ON){
			//create the button (<li> element)
			var voluniappBtt = document.createElement("li");
			$(voluniappBtt).attr("id","voluniappBtt");
			$(voluniappBtt).attr("title","open VoluniAPP");
			$(voluniappBtt).css("cursor","pointer");
			
			//bind the listener for the click event
			$(voluniappBtt).click(function(){
				//change the location to the url opened inside Volunia
				window.location = VoluniAppUtils.getUrl(window.location.href.substr(window.location.href.indexOf("rid=")+4));
				//open VoluniApp
				chrome.extension.sendRequest({msg:"setLS",stat:VoluniAppPref.STAT_OPEN});
			});
			
			//set some properties to adjust the apparence
			$(voluniappBtt).css("width","20px");
			var img = document.createElement("img");
			$(img).attr("src",chrome.extension.getURL("Resources/voluniapp32.png"));
			
			//append the button to the Header
			$(voluniappBtt).append(img);
			$(".headerRight .headerIcoList").append(voluniappBtt);
		}
	}