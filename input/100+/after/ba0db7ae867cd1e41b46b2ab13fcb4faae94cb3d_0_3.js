function(data) {
										jQuery(e).attr("count", data.count || 0);
										jQuery(".entry-title", e).html("[" + "<img style=\"margin-bottom: -3px\" src=\"" + _this.favicon + "\">" + (data.count || 0) + "] " + jQuery(".entry-title", e).html());
										
										jQuery(".collapsed", e).css("background-color", getColorForAmount(data.count || 0));
										
										AJAX_REQUEST--;
										if(AJAX_REQUEST == 0){
											propagetElement("count");
										}
									}