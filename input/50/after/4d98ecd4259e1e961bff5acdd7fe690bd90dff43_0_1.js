function() {
				var $this = $(this);
				if (!$this.find(".fd-list-check").is(":checked"))
					$this.removeClass("fd-list-selected");
			}