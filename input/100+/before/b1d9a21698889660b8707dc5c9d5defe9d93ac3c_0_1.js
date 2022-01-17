function(data, textStatus) {
		var $el = $(this);
		var rows = '';
		var id = $el.data('id');
		for (var acoId in data.permissions) {
			text = '<td>' + acoId + '</td>';
			var aliases = data.permissions[acoId]
			for (var alias in aliases) {
				var aco = aliases[alias]
				var children = aco['children']
				var classes = children > 0 ? 'controller expand' : ''
				classes += " level-" + data.level;
				text += AclPermissions.templates.controllerCell({
					id: acoId,
					alias: alias,
					level: data.level,
					classes: classes.trim()
				});
				if (Croogo.params.controller == 'acl_permissions') {
					text += renderRoles(data.aros, acoId, aco);
				} else {
					text += AclPermissions.templates.editLinks(aco['url']);
				}
			}
			var rowClass = '';
			if (children > 0 && data.level > 0) {
				rowClass = "controller-row level-" + data.level;
			}
			rows += AclPermissions.templates.permissionRow({
				id: id,
				classes: rowClass,
				text: text
			});
		}
		var $row = $el.parents('tr');
		$(rows).insertAfter($row);
		$el.removeClass('loading');
	}