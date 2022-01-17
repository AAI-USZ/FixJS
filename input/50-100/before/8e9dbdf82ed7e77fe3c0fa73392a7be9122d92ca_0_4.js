function() {
			// TODO gettext
			document.title = str + " - Search - Sage";
			$(".title").text(str + " - Search");

			_this.enable_actions_menu();
			$("#send_to_archive_button, #delete_button, #stop_button, #download_button").removeClass("disabled");
		}