function (e) {
					if (e.type === "keydown" && (!(e.ctrlKey || e.altKey || e.metaKey))) {
						switch (e.keyCode) {
						case 13: // enter key
							$popup.trigger("open");
							return false;
						case 32: // spacebar
							$popup.trigger("open");
							return false;
						case 38: // up arrow
							$popup.trigger("open");
							return false;
						case 40: // down arrow
							$popup.trigger("open");
							return false;
						}
					} else {
						if ($popup.attr('aria-hidden') === 'true') {
							$popup.trigger("open");
						} else {
							$popup.trigger("close");
						}
						return false;
					}
				}