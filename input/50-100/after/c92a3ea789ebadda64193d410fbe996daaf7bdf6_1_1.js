function () {
			console.log("disabling reverse");
			$(this).removeAttr("data-reverse").children(".triangle").removeClass("triangle-up");
			$("div#sortbar a.dropdown:has(b.triangle)").off("click.triangle").one("click.triangle", alt);
			$("div#sortbar a.dropdown:has(b.triangle-up)").off("click.triangle").one("click.triangle", self);
			$(this).off("click.triangle").one("click.triangle", self);
		}