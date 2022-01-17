function _getBounds(sel) {
		var bnds = {};

		sel.find('.ft-scaler').each(function(indx) {
			var handle = $(this),
			off = handle.offset(),
			hwid = handle.width() / 2,
			hhgt = handle.height() / 2;
			
			if (indx == 0) {
				bnds.xmin = off.left + hwid;
				bnds.xmax = off.left + hwid;
				bnds.ymin = off.top + hhgt;
				bnds.ymax = off.top + hhgt;
			} else {
				bnds.xmin = Math.min(bnds.xmin, off.left + hwid);
				bnds.xmax = Math.max(bnds.xmax, off.left + hwid);
				bnds.ymin = Math.min(bnds.ymin, off.top + hhgt);
				bnds.ymax = Math.max(bnds.ymax, off.top + hhgt);
			}
			
			bnds.width = bnds.xmax - bnds.xmin;
			bnds.height = bnds.ymax - bnds.ymin;
			bnds.center = Point(bnds.xmin + (bnds.width / 2), bnds.ymin + (bnds.height / 2));
		});
		
		return bnds;
	}