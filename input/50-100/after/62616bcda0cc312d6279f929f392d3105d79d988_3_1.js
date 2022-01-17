function () {
							$(this).attr("aria-selected", "false").attr('tabindex', '-1');
							return $("#" + $(this).attr("href").substring(1)).attr("aria-hidden", "true");
						}