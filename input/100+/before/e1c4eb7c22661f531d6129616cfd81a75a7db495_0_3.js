function (x,y,w,h) {
	//check if the application is active and if the "adap" preference is set
	if(va.pref.acti == VoluniAppPref.ACTI_ACTIVE && va.pref.adap == VoluniAppPref.ADAP_ON) {
		//check if everything was already wrap into the <div>
		if(!$("#vaDimWrp").parent().is("body")) {
			//remove VoluniApp wrapper
			$(va.wrp).detach();
			//enclose everything inside a <div>
			document.getElementsByTagName("body")[0].innerHTML="<div id=vaDimWrp>"+document.getElementsByTagName("body")[0].innerHTML+"</div>";
			//reattach VoluniApp wrapper outside the above <div> 
			$("body").append(va.wrp);
		}
		
		//resize/reposition the <div>
		$("#vaDimWrp").css("overflow","scroll");
		$("#vaDimWrp").css("position","fixed");
		$("#vaDimWrp").css("top",y+"px");
		$("#vaDimWrp").css("height",h+"px");
		$("#vaDimWrp").css("width",w+"px");
		
		//resize/reposition of fixed elements
		$("#vaDimWrp *").each(function(){
			if($(this).css("position")=="fixed") {
				//save original properties of the element into jquery data
				//structure (to treat properly multiple adapt() calls)
				if(!$(this).data("vaAdapt")) {
					$(this).data("vaAdapt",true); 
					$(this).data("vaWidth",$(this).width());
					$(this).data("vaHeight",$(this).height());
					$(this).data("vaLeft",$(this).offset().left);
					$(this).data("vaTop",$(this).offset().top);
					$(this).data("vaRight",$(this).css("right"));
					$(this).data("vaBottom",$(this).css("bottom"));
				}
				
				//resize the element if it is too large/high
				if($(this).data("vaWidth")>w)
					$(this).css("width",w+"px");
				else
					$(this).css("width",$(this).data("vaWidth"));
				if($(this).data("vaHeight")>h)
					$(this).css("height",h+"px");
				else
					$(this).css("height",$(this).data("vaHeight"));
				
				//store in variables all the coordinates
				var l=$(this).data("vaLeft");
				var t=$(this).data("vaTop");
				var r=parseInt($(this).data("vaRight"));
				var b=parseInt($(this).data("vaBottom"));
				if(!r)
					r=$(window).width()-l-$(this).width();
				if(!b)
					b=$(window).height()-t-$(this).height();
				r = $(window).width()-r;
				b = $(window).width()-b;
				
				//calculate new coordinates with standard transformations
				l = l*w/$(window).width()+x;
				t = t*h/$(window).height()+y;
				r = r*w/$(window).width()+x;
				b = b*h/$(window).height()+y;
				
				//applies new coordinates to the element
				$(this).css("left",l+"px");
				$(this).css("top",t+"px");
				$(this).css("right",$(window).width()-r+"px");
				$(this).css("bottom",$(window).height()-b+"px");
			}
		});
	}
	//if the "adap" preference is not set and the conten is adapted reload the page
	else if(va.pref.adap == VoluniAppPref.ADAP_OFF && $("#vaDimWrp").parent().is("body")) {
		window.location = "";
	}
}