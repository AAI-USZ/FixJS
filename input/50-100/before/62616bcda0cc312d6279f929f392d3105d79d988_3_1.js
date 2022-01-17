function () {
							$(this).attr("aria-selected", "false");
							return $("#" + $(this).attr("href").substring(1)).attr("aria-hidden", "true");
						}