function () {
					hlinks_same.off("click vclick");
					hlinks_same.on("click vclick", function () {
						var $this = $($(this).attr("href") + ":not(a[href], ul.tabs a, button)");
						if ($this.length > 0) {
							$.mobile.silentScroll(pe.focus($this).offset().top);
						}
					});
				}