function(response){
		//check if the btt preference is set
		if(response.ls.btt == VoluniAppPref.BTT_ON){
			var popMenu = newPopMenu("VoluniApp");
			newPopMenuElement(popMenu,"close Volunia (open VoluniApp)",function(){
				//change the location to the url opened inside Volunia
				window.location = VoluniAppUtils.getUrl(window.location.href.substr(window.location.href.lastIndexOf("rid=")+4));
				//open VoluniApp
				chrome.extension.sendRequest({msg:"setLS",stat:VoluniAppPref.STAT_OPEN});
			});
			
			newPopMenuElement(popMenu,"bookmark current page",function(){
				chrome.extension.sendRequest({msg:"bookmark",title:$("head>title").text(),url:VoluniAppUtils.getUrl(window.location.href.substr(window.location.href.lastIndexOf("rid=")+4))});
			});
			
			//create the button (<li> element)
			var voluniappBtt = document.createElement("li");
			$(voluniappBtt).attr("id","voluniappBtt");
			$(voluniappBtt).attr("title","open VoluniAPP");
			$(voluniappBtt).css("cursor","pointer");
			
			$(voluniappBtt).append(popMenu);
			$(popMenu).hide();
			
			//bind the listener for the click event
			$(voluniappBtt).click(function(){
				$(popMenu).toggle();
			});
			
			//set some properties to adjust the apparence
			var img = document.createElement("img");
			$(img).attr("src",chrome.extension.getURL("Resources/voluniapp32.png"));
			
			//append the button to the Header
			$(voluniappBtt).append(img);
			$(".headerRight .headerIcoList").append(voluniappBtt);
			
			//adjust the min-width of the headerCNT
			$(".headerCNT").css("min-width",parseInt($(".headerCNT").css("min-width"))+50+"px");
		}
	}