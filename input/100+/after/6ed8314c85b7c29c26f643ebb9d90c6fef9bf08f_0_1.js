function(index,value){
			var wrapper_class = $(value).attr("template") + "_snapshot_wrapper";
			var content_class = $(value).attr("template") + "_ snapshot_content";
			var content = $(value).attr("objectWrapper");
			$(content).addClass(content_class);
			var scrollTop = $(value).attr("scrollTop");
			var scrollLeft = $(value).attr("scrollLeft");
			$(value).html("<div class='" + wrapper_class + "' style='" + $(value).attr("objectStyle") + "'>" + VISH.Utils.getOuterHTML($(content)) + "</div>");
			
			$(value).find("." + wrapper_class).scrollTop(scrollTop);
			$(value).find("." + wrapper_class).scrollLeft(scrollLeft);
		}