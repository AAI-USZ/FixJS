function(data) {
										jQuery(e).attr("shares", data.shares || 0);
										jQuery(".entry-title", e).html("[" + "<img style=\"margin-bottom: -3px\" src=\"https://s-static.ak.facebook.com/rsrc.php/yi/r/q9U99v3_saj.ico\">" + (data.shares || 0) + "] " + jQuery(".entry-title", e).html());
										
										jQuery(".collapsed", e).css("background-color", getColorForAmount(data.shares));
										
										AJAX_REQUEST--;
										if(AJAX_REQUEST == 0){
											propagetElement("shares");
										}
									}