function(child, overrideParent) {
		var w,h,l,t, d={},
			parent = overrideParent,
			flag = false,
			threshhold = this.options.threshhold,
			padding = this.options.padding,
			childBelow = child.defaults.top > parent.defaults.top + parent.defaults.height,
			childAbove = child.defaults.top + child.defaults.height < parent.defaults.top,
			childLeftOf = child.defaults.left < parent.defaults.left,
			childRightOf = child.defaults.left > parent.defaults.left + parent.defaults.width;
			
		// Width
		if (childAbove || childBelow) {
			w = child.defaults.width;
		} else if (childRightOf) {
			w = child.defaults.left + child.defaults.width - (parent.change.left + parent.change.width) - padding;
		} else {
			w = parent.change.width - child.defaults.width + padding;
		}

		if (w < threshhold) {
			w = threshhold ;
			flag = true;
		}

		// Height
		if ( childBelow || childAbove ) {
			h = child.defaults.height + child.defaults.top - parent.change.height - padding;
		} else if ( childRightOf ) {
			h = child.defaults.height;
		} else {
			h = parent.change.height - child.defaults.height;
		}

		if (h < threshhold) {
			h = threshhold ;
			flag = true;
		}

		// Left
		if (childBelow || childAbove) {
			l = child.defaults.left;
		} else if ( childRightOf ) {
			l = (parent.change.left + parent.change.width) + padding;
		} else {
			l = parent.change.left + parent.change.width + padding;
		}

		// Top
		if (childBelow) {
			t = parent.change.top + parent.change.height + padding;
		} else {
			t = child.defaults.top;
		}

		return [{ width:w,height:h,left:l,top:t }, flag];
	}