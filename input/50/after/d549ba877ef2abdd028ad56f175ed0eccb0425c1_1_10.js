function(keyword) {
			font.size = cssSizeToLegacy(keyword);
			callee.sizeMap[keyword] = $_.getComputedStyle(font).fontSize;
		}