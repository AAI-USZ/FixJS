function(amount){
					
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