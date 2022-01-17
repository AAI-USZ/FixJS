function ($tabs, $panels, opts, keepFocus) {
				var $current,
					$prev,
					cycleButton;
				$panels.stop(true, true);
				$current = $tabs.filter(function () {
					return $(this).is("." + opts.tabActiveClass);
				});
				$prev = $tabs.eq(($tabs.index($current) - 1) + $tabs.size() % $tabs.size());
				if (opts.animate) {
					$panels.filter("." + opts.panelActiveClass).removeClass(opts.panelActiveClass).attr("aria-hidden", "true").fadeOut(opts.animationSpeed, function () {
						return $panels.filter("#" + $prev.attr("href").substr(1)).fadeIn(opts.animationSpeed, function () {
							return $(this).addClass(opts.panelActiveClass).attr("aria-hidden", "false");
						});
					});
				} else {
					$panels.removeClass(opts.panelActiveClass).attr("aria-hidden", "true").hide();
					$panels.filter("#" + $prev.attr("href").substr(1)).show().addClass(opts.panelActiveClass).attr("aria-hidden", "false");
				}
				$tabs.parent().removeClass(opts.tabActiveClass).children().removeClass(opts.tabActiveClass).filter("a").attr("aria-selected", "false").attr('tabindex', '-1');
				$prev.parent().addClass(opts.tabActiveClass).children().addClass(opts.tabActiveClass).filter("a").attr("aria-selected", "true").attr('tabindex', '0');
				cycleButton = $current.parent().siblings(".tabs-toggle");
				if (!keepFocus && (cycleButton.length === 0 || cycleButton.data("state") === "stopped")) {
					return pe.focus($prev);
				}
			}