function(index) {
		var field = $(this);
		var field_name = field.attr("name");
        var field_value = field.val();
		var options = window[field_name + "_options"];

        var selected_index = null;

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
                if (field_value == id) {
					selected_index = i;
				}
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
			else if (entity == undefined) {
				field.val("");
				field.change();
			}
		});

		field.hide();
		if (selected_index != undefined) {
			loadNode({currentTarget:menu[0].childNodes[selected_index].childNodes[0],delegateTarget:menu[0]});
		}
	}