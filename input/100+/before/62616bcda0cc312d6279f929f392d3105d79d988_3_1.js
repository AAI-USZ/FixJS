function () {
						$(this).parent().parent().children("." + opts.tabActiveClass).children("a").each(function () {
							$(this).attr("aria-selected", "false");
							return $("#" + $(this).attr("href").substring(1)).attr("aria-hidden", "true");
						});
						$(this).attr("aria-selected", "true");
						return $("#" + $(this).attr("href").substring(1)).attr("aria-hidden", "false");
					}