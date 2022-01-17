function () {
			$("div.info span.loaded").html(loaded++);
			$(this).parents("div.wrap").removeClass("hide").addClass("loaded");
		}