function () {
		console.log("displaying the beginning")
		$("#startGame").css("display","none");
		displaySourceImage();
		//assume game doesn't start until webcam is loaded
		webcam.capture(3);
	}