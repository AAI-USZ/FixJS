function (index, value) {
				var $childmenu, $elm;
				$elm = $(value);
				$elm.addClass("knav-" + index + "-0-0");
				$childmenu = $elm.closest("li").find(".mb-sm");
				if ($childmenu.size() > 0) {
					$elm.attr("aria-haspopup", "true").addClass("mb-has-sm").wrapInner("<span class=\"expandicon\"><span class=\"sublink\"></span></span>");
					$childmenu.attr("role", "menu").attr("aria-expanded", "false").attr("aria-hidden", "true").find(":has(:header) ul").attr("role", "menu");
					$elm.append("<span class=\"wb-invisible\">" + (pe.dic.get('%sub-menu-help')) + "</span>");
					$elm.closest("li").hoverIntent({
						over: function () {
							return showsubmenu(this);
						},
						out: function () {
							return hidesubmenu(this);
						},
						timeout: 500
					});
					/* now recurse all focusable to be able to navigate */
					$childmenu.find("h3 a, h4 a").each(function (i) {
						$(this).addClass("knav-" + index + "-" + (i + 1) + "-0");
						$(this).parent().next("ul").find("a").each(function (j) {
							$(this).addClass("knav-" + index + "-" + (i + 1) + "-" + (j + 1));
							return;
						});
						return;
					});
					/*$childmenu.find("ul").not(function () {
						return ($(this).prev("h3, h4").length === 0 || $(this).parent('li').length === 0);
					}).find("a").each(function (i) {
						$(this).addClass("knav-" + index + "-0-" + (i + 1));
					});*/
					$childmenu.find("> ul a, > div > ul a").each(function (i) {
						$(this).addClass("knav-" + index + "-0-" + (i + 1));
					});
				}
			}