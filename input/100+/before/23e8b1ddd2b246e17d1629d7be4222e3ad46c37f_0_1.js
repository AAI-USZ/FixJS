function () {
	    if ($("#vrtoggle").text() == "Virtual Tour") {
	       $("#slider").fadeOut(750, "easeInOutSine", null);
	       $("#virtual-tours").fadeIn(750, "easeInOutSine", null);
	       $(this).text("Photos");
	    } else {
	       $("#slider").fadeIn(750, "easeInOutSine");
	       $("#virtual-tours").fadeOut(750, "easeInOutSine");
	       $(this).text("Virtual Tour");
	    }
	}