function($) {
        url = S3.Ap.concat('/org/organisation.json?show_ids=true');
        $.getJSON(url, function(data) {
		for (var i=0; i<data.length; i++) {
			var id = data[i].id;
			var pe_id = data[i].pe_id;
			var name = data[i].name;

			organisations[pe_id] = {
				"id": id,
				"pe_id": pe_id,
				"name": name
			};
		}
	});

	$(".widget-org-hierarchy").each(function(index) {
		var field = $(this);
		var field_name = field.attr("name");
		var options = window[field_name + "_options"];

		var entity_list = [];
		if (options != undefined) {
			for (var i=0; i<options.length; i++) {
				var id = options[i].id;
				var pe_id = options[i].pe_id;
				var name = options[i].name;
				var path = pe_id;

				entity = {
					"id": id,
					"pe_id": pe_id,
					"name": name,
					"path": path,
					"type": "entity",
					"resource": "org_organisation"
				};
				org_hierarchy[pe_id] = entity;
				entity_list.push(entity);
			}
		}

		var container = $("<div/>").addClass("widget-org-hierarchy-menu");
		var menu = new Menu(field_name).attr("id", field_name + "-top");
		updateDomHierarchy(menu, entity_list);
		container.append(menu);
		container.insertAfter(field);

		var crumbs = $("<ul/>")
			.attr("id", field_name + "-crumbs")
			.addClass("widget-org-hierarchy-crumbs")
			.insertAfter(field);

		var crumb_top = $("<li><a>All</a></li>").data("target", field_name + "-top");

		crumbs.append(crumb_top);

		crumbs.on("click", "li", function(event) {
			crumb = $(this);
			var target = crumb.data("target");

			crumb.nextAll().remove();

			var menu = $("#" + target);
			menu.nextAll().remove();

			if (parseInt(menu.css('left'),10) < 0) {
				menu.animate({
					left: 0
				});
			}

			var path = target.replace(field_name + "-", "");
			var entity = getEntity(path);
			if(entity != undefined && entity.resource == "org_organisation") {
				field.val(entity.id);
				field.change();
				crumb.addClass("selected");
			}
		});

		field.hide();
	});
}