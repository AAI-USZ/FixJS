function () {
						$(this).parent().parent().children("." + opts.tabActiveClass).children("a").each(function () {
							$(this).attr("aria-selected", "false").attr('tabindex', '-1');
							return $("#" + $(this).attr("href").substring(1)).attr("aria-hidden", "true");
						});
						$(this).attr("aria-selected", "true").attr('tabindex', '0');
						return $("#" + $(this).attr("href").substring(1)).attr("aria-hidden", "false");
					}