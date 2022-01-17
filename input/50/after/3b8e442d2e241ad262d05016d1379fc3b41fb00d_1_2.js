function (obj) {
			if (!obj || $(obj).length <= 0) {
				return false;
			}
			return $(obj).find('span[role=annotation]').length > 0;
		}