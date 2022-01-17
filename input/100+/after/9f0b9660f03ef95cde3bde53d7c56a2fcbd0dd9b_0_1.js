function toggle(x) {
		switch(x) {
			case "on":
				$('#workoutForm').css("display", "none");
				$('#showData').css("display", "none");
				// $('#clearData').css("display", "none");
				// $('#startNew').css("display", "inline");
				// $('#saveData').css("display", "none");
				// $('#addBack').css("display", "none");
				// $('#foot').css("display", "none");
				break;
			case "off":
				$('#workoutForm').css("display", "block");
				// $('#showData').css("display", "inline");
				// $('#clearData').css("display", "inline");
				// $('#startNew').css("display", "none");
				$('#saveData').css("display", "inline");
				// $('#addBack').css("display", "inline");
				$('#foot').css("display", "block");
				$('#items').css("display", "none");
				break;
			default:
				return false;
		}
	}