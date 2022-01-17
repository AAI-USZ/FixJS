function resizeElement(e) {
			var deltaX, deltaY, ratio;

			// Calc new width/height
			deltaX = e.screenX - startX;
			deltaY = e.screenY - startY;
			ratio = Math.max((startW + deltaX) / startW, (startH + deltaY) / startH);

			if (VK.modifierPressed(e)) {
				// Constrain proportions
				width = Math.round(startW * ratio);
				height = Math.round(startH * ratio);
			} else {
				// Calc new size
				width = deltaX * selectedHandle[2] + startW;
				height = deltaY * selectedHandle[3] + startH;
			}

			// Never scale down lower than 5 pixels
			width = width < 5 ? 5 : width;
			height = height < 5 ? 5 : height;

			// Update ghost size
			dom.setStyles(selectedElmGhost, {
				width: width,
				height: height
			});

			// Update ghost X position if needed
			if (selectedHandle[2] < 0 && selectedElmGhost.clientWidth <= width) {
				dom.setStyle(selectedElmGhost, 'left', selectedElmX + deltaX);
			}

			// Update ghost Y position if needed
			if (selectedHandle[3] < 0 && selectedElmGhost.clientHeight <= height) {
				dom.setStyle(selectedElmGhost, 'top', selectedElmY + deltaY);
			}
		}