function(event) {
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
		}