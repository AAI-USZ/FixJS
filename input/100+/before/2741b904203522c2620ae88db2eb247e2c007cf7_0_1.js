function getVerticalPositionAndRatio(event, imageHeight, imageWidth) {

		var ratio = 1,

			vPadding = 10,

			vClearance = imageHeight / 2 + vPadding,

			vPosition = event.clientY - vClearance,

			topMargin = event.clientY,

			bottomMargin = $(window).height() - event.clientY,

			rightMargin = $(window).width() - event.clientX;

		if (vClearance > topMargin){

			vPosition = vPadding;

		} else if (vClearance > bottomMargin) {

			vPosition = $(window).height() - imageHeight - vPadding;

		}	

		if (rightMargin < imageWidth){

			ratio = rightMargin / imageWidth;

		}

		

		return {position: vPosition, ratio: ratio};

	}