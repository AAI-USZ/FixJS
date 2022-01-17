function(keyword) {
			font.size = cssSizeToLegacy(keyword);
			callee.sizeMap[keyword] = getComputedStyle(font).fontSize;
		}