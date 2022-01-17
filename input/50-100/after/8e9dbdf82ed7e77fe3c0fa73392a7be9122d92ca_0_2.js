function() {
			// TODO gettext
			$(".title").text("Archive");
			document.title = "Archive - Sage";
			$("#search_input").val("");
			$("#main_checkbox").prop("checked", false);

			_this.enable_actions_menu();
			$("#unarchive_button, #delete_button, #stop_button, #download_button").removeClass("disabled");
		}