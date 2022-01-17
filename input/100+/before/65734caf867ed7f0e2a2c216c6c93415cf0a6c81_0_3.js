function () {
			F.showLoading();

			F.ajaxLoad = $.ajax($.extend({}, F.coming.ajax, {
				url: F.coming.url,
				error: function (jqXHR, textStatus, errorThrown) {
					if (textStatus !== 'abort' && jqXHR.status > 0) {
						F.coming.content = errorThrown;

						F._error();

					} else {
						F.hideLoading();
					}
				},
				success: function (data, textStatus, jqXHR) {
					if (textStatus === 'success') {
						F.coming.content = data;

						F._afterLoad();
					}
				}
			}));
		}