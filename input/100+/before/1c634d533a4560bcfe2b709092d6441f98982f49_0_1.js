function(event,ui) {
			
			if ($(this).find("li").length > 0) {
				
				$(this).parent().find(".info").fadeOut(300);
			}
			$(".is_shown li[ref='" + $(ui.item).attr("ref") + "']").animate({ opacity: 0.5 },300);
			$(".is_shown li[ref='" + $(ui.item).attr("ref") + "']").removeClass("item");
			$(".is_shown li[ref='" + $(ui.item).attr("ref") + "']").draggable("destroy");
			
			$(".is_shown li[ref='" + $(ui.item).attr("ref") + "']").unbind("mouseup");
			
			addToPlayList($(ui.item).attr("ref"));
			
			checkArrowVisibility();
		}