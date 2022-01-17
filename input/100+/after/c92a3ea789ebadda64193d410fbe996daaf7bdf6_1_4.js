function (e) {
		if(e.cancelable) e.preventDefault();
		$("div.btn-group a[data-toggle='sort']").removeClass("active");
		$(this).addClass("active");
		var attr = "[data-sort='"+($(this).attr("data-sort"))+"']";
		var type = $(this).attr("data-class");
		var reverse = !!$(this).attr("data-reverse");
		console.log(reverse);
		var arr = $("div.div-striped > div").detach().toArray();
		var $arr = $(arr);
		arr.sort(function (a, b) {
			var $a = $(a);
			var $b = $(b);
			var fileClassA;
			var tabA;
			if($a.hasClass("div-tab")) {
				fileClassA = (/file[0-9]+/).exec($a.attr("data-target"))[0];
				tabA = true;
			} else {
				fileClassA = (/file[0-9]+/).exec($a.attr("class"))[0];
				tabA = false;
			}
			var fileClassB;
			var tabB;
			if($b.hasClass("div-tab")) {
				fileClassB = (/file[0-9]+/).exec($b.attr("data-target"))[0];
				tabB = true;
			} else {
				fileClassB = (/file[0-9]+/).exec($b.attr("class"))[0];
				tabB = false;
			}
			if(fileClassA === fileClassB) {
				if(tabA) return -1;
				if(tabB) return 1;
				var propA = $a.find("a[data-toggle='sort']").attr("data-sort");
				var propB = $b.find("a[data-toggle='sort']").attr("data-sort");
				switch (propA) {
					case "Date Modified":
						return -1;
					case "Content-Type":
						switch (propB) {
							case "Date Modified":
								return 1;
							case "Size":
								return -1;
						}
					case "Size":
						return 1;
				}
			}
			var sortA = $arr.filter("."+fileClassA).add($arr.filter("[data-target='."+fileClassA+"']")).find("a"+attr).attr("data-value");
			var sortB = $arr.filter("."+fileClassB).add($arr.filter("[data-target='."+fileClassB+"']")).find("a"+attr).attr("data-value");
			switch (type) {
				case "Date":
					sortA = new Date(sortA).getTime();
					sortB = new Date(sortB).getTime();
				case "Number":
					sortA = Number(sortA);
					sortB = Number(sortB);
					if(sortB!==sortA) return (reverse?sortA-sortB:sortB-sortA);
					var fileIndexA = Number(fileClassA.substr(4));
					var fileIndexB = Number(fileClassB.substr(4));
					return (reverse?fileIndexB-fileIndexA:fileIndexA-fileIndexB);
				case "String":
					if(sortA.toLowerCase().localeCompare(sortB.toLowerCase())!==0) {
						return sortA.toLowerCase().localeCompare(sortB.toLowerCase())*(reverse?-1:1);
					}
					var fileIndexA = Number(fileClassA.substr(4));
					var fileIndexB = Number(fileClassB.substr(4));
					return (reverse?fileIndexB-fileIndexA:fileIndexA-fileIndexB);
			}
		}).forEach(function (elem) {
			$("div.div-striped").append(elem);
		});
		$("div.div-striped div.div-row").each(function (index, el) {
			if(index%2==1) {
				$(el).addClass("striped-row");
			} else {
				$(el).removeClass("striped-row");
			}
	//prevent last div from overlapping on the .div-striped border-radius
		}).removeClass("last").last().addClass("last");
		$("div#sortbar a[data-toggle='sort']").off("click.sort").one("click.sort", arguments.callee);
		return false;
	}