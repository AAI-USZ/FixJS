function setPositionAndDimensions(event, zoomedImage, zoomedImageDimensions){

		var positionAndRatio = getVerticalPositionAndRatio(event, zoomedImageDimensions.height, zoomedImageDimensions.width);

		$(zoomedImage).css({

			top:    positionAndRatio.position, 

			left:   event.pageX, 

			width:  zoomedImageDimensions.width * positionAndRatio.ratio,

			height: zoomedImageDimensions.height * positionAndRatio.ratio

		});

	}