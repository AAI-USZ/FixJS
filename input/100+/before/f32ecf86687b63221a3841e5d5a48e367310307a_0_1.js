function() {
		var q = $("#search_input").val();
		if($.trim(q) === "") return;

		var current_id = $("#type_buttons .active").attr("id");
		var str, type;

		switch(current_id) {
			case "show_active":
				str = "Active";
				type = "active";
				break;
			case "show_archive":
				str = "Archive";
				type = "archive";
				break;
			case "show_trash":
				str = "Trash";
				type = "trash";
				break;
		}

		_this.disable_actions_menu();
		_this.load(("type=" + type + "&search=" + q), function() {
			// TODO gettext
			document.title = str + " - Search - Sage";
			$(".title").text(str + " - Search");
			$("#main_checkbox").prop("checked", false);

			_this.enable_actions_menu();
			$("#send_to_archive_button, #delete_button, #stop_button, #download_button").removeClass("disabled");
		});
	}