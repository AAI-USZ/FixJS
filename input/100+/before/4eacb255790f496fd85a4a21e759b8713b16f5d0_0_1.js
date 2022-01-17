function() {
	
	if (get_cookie("playlist") == null) {
		
		set_cookie("playlist","");
	}
	playlist = get_cookie("playlist");
	
	matrixDraggable();
	
	removeDraggableFromItemsByCookie();
	addDraggableToItems(".page .item");
	matrixArrows();
	playListSortable();
	
	$(".arrow.right").live("click",function() {
		
		matrixMove("right");
	});
	$(".arrow.left").live("click",function() {
		
		matrixMove("left");
	});
	
	resizeGridByWindowWidth();
	positionGrid();
	
	$(window).resize(function() {
		
		resizeGridByWindowWidth();
		positionGrid();
	});
	addItemListeners();
	
	$(".overlay").bind("mouseup", function() {
		
		close_box($(".open"));
	});
	
	$(".playlistDown").live("click",function() {
		
		playListMove("down");
	});
	$(".playlistUp").live("click",function() {
		
		playListMove("up");
	});
	
	$(".playButton").live("click",function(e) {	
	
		e.preventDefault();
		videoLayerOpen(e);
	});
	
	$(".closeButton").live("click",function(e) {
			
		e.preventDefault();
		videoLayerClose(e);
	});
	$("#movieDetailPreview").live("click",function(e) {
		
		videoLayerOpen(e);
	});
	
	$(".playListRight").live("click",function(e) {
		
		e.preventDefault();
		video_src = getNextVideoFromPlaylist();
			
		if (video_src != null) {
			
			//Check if on IPAD
			if (video_player != null) {
				video_player.loadVideoByUrl(video_src);
			}
			else {
				new_video_player(video_src);
			}
		}
	});
	
	$(".playListLeft").live("click",function(e) {
		
		e.preventDefault();
		video_src = getPrevVideoFromPlaylist();
			
		if (video_src != null) {
			
			if (video_player != null) {
				video_player.loadVideoByUrl(video_src);
			}
			else {
				new_video_player(video_src);
			}
		}
	});
	
	
	
	
	
	pageNavStructure();
	
	$("#pageNav > li").mouseenter(function() {
		
		var li = $(this);
		
		$(this).addClass("has_focus");
		
		setTimeout(function(){
				
		  if ($(li).hasClass("has_focus")) {
			   
			   if (!$(li).find("ul").is(":animated")) {
				   
					$(li).find("ul").slideDown(300);
			   }
		  }
		}, 500);
		
	}).mouseleave( function() {
		
		$(this).find("ul").stop();
		$(this).find("ul").slideUp();
		$(this).removeClass("has_focus");
	});
	
	$("#pageNav > li").click(function() {
		
		if ($(this).find("ul").is(":visible")) {
			
			$(this).find("ul").slideUp();
		}
		else {
			$(this).find("ul").slideDown();
		}
	});
	
	
	
	
	
	
	$(".playButtonPlaylist").live("click",function() {
		
		if ($(".playList ul li").length > 0) {
			
			videoLayerPlaylistOpen();
		}
	});	
		
	$(".deleteButtonPlaylist").live("click", function() {
		
		$(".page > li").each(function() {

			if ($(this).css("opacity") == "0.5") {
				
				$(this).animate({
					
					opacity: 1
				}, function() {

					addDraggableToItems($(this));
					$(this).addClass("item");
				});
			}
		});
		$(".playList ul > li").each(function() {
			
			$(this).fadeOut(300, function() {
				
				$(this).remove();
			});
		});
		set_cookie("playlist","");
		
		$(".playList .info").delay(300).fadeIn(300);
	});
	
}