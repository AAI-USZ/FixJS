function() {
			// TODO gettext
			$(".title").text("My Notebook");
			document.title = "My Notebook - Sage";
			$("#search_input").val("");
			$("#main_checkbox").prop("checked", false);

			_this.enable_actions_menu();
			$("#send_to_archive_button, #delete_button, #stop_button, #download_button").removeClass("disabled");
		}