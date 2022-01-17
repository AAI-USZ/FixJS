function() {
		var $el = $(this);
		var id = $el.data('id');
		var level = $el.data('level');

		$el.addClass('loading');
		if ($el.hasClass('expand')) {
			$el.removeClass('expand').addClass('collapse');
		} else {
			var children = $('tr[data-parent_id=' + id + ']');
			children.each(function() {
				var childId = $('.controller', this).data('id')
				$('tr[data-parent_id=' + childId + ']').remove();
			}).remove();
			$el.removeClass('loading collapse').addClass('expand');
			return;
		}

		var params = {
			perms: true
		};
		if (Croogo.params.controller == 'acl_actions') {
			params = $.extend(params, {
				urls: true,
				perms: false
			});
		}

		var url = Croogo.basePath + 'admin/acl/acl_permissions/index/';
		$.getJSON(url + id + '/' + level, params, function(data, textStatus) {
			renderPermissions.call($el[0], data, textStatus);
		});
	}