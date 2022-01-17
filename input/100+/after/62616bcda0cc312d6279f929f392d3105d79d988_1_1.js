function () {
					// Remove the hash for links to other pages
					hlinks_other.each(function () {
						$(this).attr('href', pe.url($(this).attr('href')).removehash());
					});

					// Handles same page links
					hlinks_same.off("click vclick").on("click vclick", function () {
						var $this = $($(this).attr("href"));
						$this.filter(':not(a, button, input, textarea, select)').attr('tabindex', '-1');
						if ($this.length > 0) {
							$.mobile.silentScroll(pe.focus($this).offset().top);
							//location.hash = $(this).attr('href');
						}
					});
				}