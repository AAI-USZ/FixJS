function(amount){
				
					var _this = this;
					
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
										jQuery(".entry-title", e).html("[" + "<img style=\"margin-bottom: -3px\" src=\"" + _this.favicon + "\">" + (data.shares || 0) + "] " + jQuery(".entry-title", e).html());
										
										jQuery(".collapsed", e).css("background-color", getColorForAmount(data.shares || 0));
										
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