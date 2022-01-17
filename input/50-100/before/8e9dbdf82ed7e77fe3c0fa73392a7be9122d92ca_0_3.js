function() {
			// TODO gettext
			$(".title").text("Trash");
			document.title = "Trash - Sage";
			$("#search_input").val("");

			_this.enable_actions_menu();
			$("#send_to_archive_button, #undelete_button, #stop_button, #download_button, #empty_trash").removeClass("disabled");
		}