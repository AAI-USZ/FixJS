function () {
				$(this).attr("aria-selected", "true").attr('tabindex', '0');
				return $("#" + $(this).attr("href").substring(1)).attr("aria-hidden", "false");
			}