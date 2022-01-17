function(e, ui) {
			insert_idx = $(this).attr('id');
			$(this).text(ui.draggable.text());
			$(this).removeClass("space", "hover");
			$(this).addClass("word", "highlight");
			ui.draggable.hide();
			$(".space").hide();
			$("#orig").qtip("destroy");
		}