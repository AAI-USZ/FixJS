function(data) {
										jQuery(e).attr("shares", data.shares || 0);
										jQuery(".entry-title", e).html("[" + "<img style=\"margin-bottom: -3px\" src=\"" + _this.favicon + "\">" + (data.shares || 0) + "] " + jQuery(".entry-title", e).html());
										
										jQuery(".collapsed", e).css("background-color", getColorForAmount(data.shares || 0));
										
										AJAX_REQUEST--;
										if(AJAX_REQUEST == 0){
											propagetElement("shares");
										}
									}