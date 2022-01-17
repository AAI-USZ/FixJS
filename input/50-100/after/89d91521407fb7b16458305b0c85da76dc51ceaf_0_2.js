function() {
							
							last = $(".contentBox:last-child").clone();
							
							$(last).removeClass("ui-draggable");
							
							$(".contentBox:first-child").before($(last).css("left","-" + (contentBoxWidth*2) + "px"));
							
							$(".contentBox:last-child").remove();
						}