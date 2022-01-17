function(seek)
	{
		var seekBtn = $("<button>")
			.attr("id", "seek_"+seek.id)
			.addClass("seek")
			.data("icon", "delete")
			.data("iconpos", "right")
			.data("seekid", seek.id)
			.text(seek.variant+" "+seek.board_width+"x"+seek.board_height)
			.click(function(){
				var el = $(this);
				var seekid = el.data("seekid");
				C4.send("CANCEL_SEEK "+C4.padId(seekid));
				C4.add_handler(C4.cb_cancel_seek);
			});
		$(".my-seeks").append(seekBtn).trigger("create");
		$("#my-seeks-title").text("Your seeks");
	}