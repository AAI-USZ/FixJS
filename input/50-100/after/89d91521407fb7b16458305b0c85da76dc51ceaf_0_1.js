function() {
							
							first = $(".contentBox:first-child").clone();
							
							$(first).removeClass("ui-draggable");
							
							$(".contentBox:last-child").after($(first).css("left",(contentBoxWidth*2) + "px"));
							
							$(".contentBox:first-child").remove();
						}