function () {
			
			// Closable Off: don't anything
			if (!that.closable) { return; }

			// Closable On

			if (ch.utils.hasOwn(conf, "closeButton") && conf.closeButton || ch.utils.hasOwn(conf, "event") && conf.event === "click") {
				// Append close buttons	
				// It will close with close button
				that.$container
					.prepend("<a class=\"ch-close\" role=\"button\" style=\"z-index:" + (ch.utils.zIndex += 1) + "\"></a>")
					.bind("click", function (event) {
						if ($(event.target || event.srcElement).hasClass("ch-close")) { 
							that.innerHide(event);
						}
					});
			}

			// It will close only with close button
			if (that.closable === "button") {
				return;
			}

			// Default Closable behavior
			// It will close with click on document, too
			that.on("show", function () {
				ch.utils.document.one("click", that.innerHide);
			});

			// Stop event propatation, if click container.
			that.$container.bind("click", function (event) {
				event.stopPropagation();
			});

			// and ESC key support
			ch.utils.document.bind(ch.events.KEY.ESC, function () {
				that.innerHide();
			});
		}