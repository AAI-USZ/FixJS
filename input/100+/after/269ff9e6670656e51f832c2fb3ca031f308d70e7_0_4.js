function(seek)
	{
		var seekBtn = $("<button>")
			.attr("id", "seek_"+seek.id)
			.addClass("seek")
			.data("icon", "arrow-r")
			.data("iconpos", "right")
			.data("seekid", seek.id)
			.text(seek.variant+" "+seek.board_width+"x"+seek.board_height)
			.click(function(){
				var el = $(this);
				var seekid = el.data("seekid");
				C4.send("ACCEPT_SEEK "+C4.padId(seekid));
				C4.add_handler(C4.cb_new_game);
			});
		$(".seek-list").append(seekBtn).trigger("create");
		$("#seeks-title").text("Seeks from others");
	}