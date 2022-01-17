function (tag) {
			if (!this.$[tag].is(":visible")) {
				return;
			}
			//check last element ...
			var last = this.$.tbody.children("." + this.options.spacer + tag)
			if (last.length) {
				last.remove();
			}

			var spacer = this.$[tag].children(0).clone().addClass(this.options.spacer).addClass(tag);

			// wrap contents with a spacing
			spacer.children("th, td").each(function () {
				var td = $(this);
				td.html("<div style='float: left;'>" + td.html() + "</div>")
			});

			spacer.appendTo(this.$.tbody);

			//now set spacing, and make minimal height
			spacer.children("th, td").each(function () {
				var $td = $(this),
					$spacer = $td.children(':first'),
					width = $spacer.outerWidth();

				$td.css({
					"padding-top" : 0,
					"padding-bottom" : 0,
					margin : 0,
					width : ""
				}) // If padding is removed from the cell sides, layout might break!
				$spacer.outerWidth(width + 2).css({
					"float" : "none",
					"visibility" : "hidden",
					height : "1px"
				}).html("")
			})
			this.$.spacer = spacer;
		}