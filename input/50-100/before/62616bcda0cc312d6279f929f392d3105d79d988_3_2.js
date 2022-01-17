function () {
				$(this).attr("aria-selected", "true");
				return $("#" + $(this).attr("href").substring(1)).attr("aria-hidden", "false");
			}