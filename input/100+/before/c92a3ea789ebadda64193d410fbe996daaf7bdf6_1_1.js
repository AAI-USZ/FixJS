function () {
		var self = arguments.callee;
		var alt = function () {
			$(this).children(".triangle").removeClass("triangle-up");
			$("div#sortbar a.dropdown:has(b.triangle)").off("click.triangle").one("click.triangle", alt);
			$("div#sortbar a.dropdown:has(b.triangle-up)").off("click.triangle").one("click.triangle", self);
			$(this).off("click.triangle").one("click.triangle", self).removeAttr("data-reverse");
		};
		$(this).children(".triangle").addClass("triangle-up");
		$("div#sortbar a.dropdown:has(b.triangle)").off("click.triangle").one("click.triangle", alt);
		$("div#sortbar a.dropdown:has(b.triangle-up)").off("click.triangle").one("click.triangle", self);
		$(this).off("click.triangle").one("click.triangle", alt).attr("data-reverse", "reverse");
	}