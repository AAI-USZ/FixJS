function(){
	
		var AJAX_REQUEST = 0;
		
		var getColorForAmount = function(a){
			var colors = ["#FF0000", "#FF4000", "#FF7700", "#FF9500", "#FFBF00", "#FFFF00"];
			var amount = [100, 50, 20, 10, 5, 0];
			
			for(var am in amount){
				if(a >= amount[am]){
					return colors[am];
				}
			}
			
			return colors[colors.length];
		
		};
		
		// function check if passed e.href.domain == href.domain from header
		var proxyExist = function(e){
			return (jQuery("#chrome-title a").length) ? jQuery("#chrome-title a").attr("href").split("/")[2] != e.attr("href").split("/")[2] : false;
		};
		
		var propagetElement = function(attr){
			jQuery("#entries .entry").each(function(d, el){
				while(parseInt(jQuery(el).prev().attr(attr)) < parseInt(jQuery(el).attr(attr))) {
				   jQuery(el).prev().before(jQuery(el));
				};
			});
		};
		
		var portals = [
			{
				label: "FB",
				url: "https://graph.facebook.com/",
				favicon: "https://s-static.ak.facebook.com/rsrc.php/yi/r/q9U99v3_saj.ico",
				search: function(amount){
				
					jQuery("#entries .entry").each(function(d, e){
						(function(){
						
							if(jQuery(e).attr("shares")){
								propagetElement("shares");
								jQuery(".collapsed", e).css("background-color", getColorForAmount(jQuery(e).attr("shares")));
								return;
							}
					
							var callback = function(url){
								
								AJAX_REQUEST++;
								
								jQuery.ajax({
									url: "https://graph.facebook.com/" + url,
									crossDomain: true,
									dataType: "json",
									success: function(data) {
										jQuery(e).attr("shares", data.shares || 0);
										jQuery(".entry-title", e).html("[" + "<img style=\"margin-bottom: -3px\" src=\"https://s-static.ak.facebook.com/rsrc.php/yi/r/q9U99v3_saj.ico\">" + (data.shares || 0) + "] " + jQuery(".entry-title", e).html());
										
										jQuery(".collapsed", e).css("background-color", getColorForAmount(data.shares));
										
										AJAX_REQUEST--;
										if(AJAX_REQUEST == 0){
											propagetElement("shares");
										}
									}
								});
							}
							
							if(proxyExist(jQuery(".entry-original", e))){
								jQuery.getJSON("http://json-longurl.appspot.com/?url=" + jQuery(".entry-original", e).attr("href") + "&callback=?", function(data){
									callback(data.url);
								});
							}
							else{
								callback(jQuery(".entry-original", e).attr("href"))
							}
						})();
					});
				}
			},
			{
				label: "TW",
				url: "http://urls.api.twitter.com/1/urls/count.json?callback=?&url=",
				favicon: "https://twitter.com/favicons/favicon.ico",
				search: function(amount){
					
					jQuery("#entries .entry").each(function(d, e){
						(function(){
						
							if(jQuery(e).attr("count")){
								propagetElement("count");
								jQuery(".collapsed", e).css("background-color", getColorForAmount(jQuery(e).attr("count")));
								return;
							}
						
							var callback = function(url){
								
								AJAX_REQUEST++;
								
								jQuery.ajax({
									url: "http://urls.api.twitter.com/1/urls/count.json?url=" + url + "&callback=?",
									crossDomain: true,
									dataType: "json",
									success: function(data) {
										jQuery(e).attr("count", data.count || 0);
										jQuery(".entry-title", e).html("[" + "<img style=\"margin-bottom: -3px\" src=\"https://twitter.com/favicons/favicon.ico\">" + (data.count || 0) + "] " + jQuery(".entry-title", e).html());
									
										jQuery(".collapsed", e).css("background-color", getColorForAmount(data.count));
										
										AJAX_REQUEST--;
										if(AJAX_REQUEST == 0){
											propagetElement("count");
										}
									}
								});
							}
							
							if(proxyExist(jQuery(".entry-original", e))){
								jQuery.getJSON("http://json-longurl.appspot.com/?url=" + jQuery(".entry-original", e).attr("href") + "&callback=?", function(data){
									callback(data.url);
								});
							}
							else{
								callback(jQuery(".entry-original", e).attr("href"))
							}
						})();
					});
				}
			}
		];
		
		
		var button;
		
		for(var p in portals){
			var button = jQuery("<div class=\"goog-inline-block jfk-button jfk-button-standard viewer-buttons\"><img class=\"jfk-button-img\" src=\"" + portals[p].favicon + "\" /></div>");
			
			var getClickCallback = function(a, p){
				return function(){
					AJAX_REQUEST = 0;
					p.search(50, p);
				}
			}
			button.click(getClickCallback(50, portals[p]));
			
			jQuery("#viewer-refresh").before(button);
		}
		
	}