function loadPage() {
	// Staggered fade effect
	var showItem=function() {
		var self=this;
		$(self).stop().animate({'opacity':1},1500,'easeOutExpo')
	};
	var timeout=0;
	$('.init').each(function(n) {
		var self=this;
		$(self).css({'opacity':0});
		setTimeout(function() {
			showItem.apply(self)
		},timeout+=150)
	});

    $("#slider").responsiveSlides({
		auto: true,
		speed: 600,
		timeout: 5000,
		pause: true
	});
		
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano1_stitched_out.swf", "pano1", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano2_stitched_out.swf", "pano2", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano3_stitched_out.swf", "pano3", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano4_stitched_out.swf", "pano4", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano5_stitched_out.swf", "pano5", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano6_stitched_out.swf", "pano6", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano7_stitched_out.swf", "pano7", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano8_stitched_out.swf", "pano8", "680", "304", "9.0.0");

	$("#vrtoggle").click(function () {
	    if ($("#vrtoggle").text() == "Virtual Tour") {
	       $("#slider").fadeOut(750, "easeInOutSine", null);
	       $("#virtual-tours").fadeIn(750, "easeInOutSine", null);
	       $(this).text("Photos");
	    } else {
	       $("#slider").fadeIn(750, "easeInOutSine");
	       $("#virtual-tours").fadeOut(750, "easeInOutSine");
	       $(this).text("Virtual Tour");
	    }
	});
}