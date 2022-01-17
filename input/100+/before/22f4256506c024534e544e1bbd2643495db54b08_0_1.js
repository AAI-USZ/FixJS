function()
	{
		size = Math.min(window.innerWidth, window.innerHeight, 800) * 0.4;	
		
		$("#ecplus_loader").css({"width"  : size + "px", "height" : size + "px", "position" : "fixed", "top" : "50%", "left" : "50%", "margin-left" : "-" + (size/2) + "px", "margin-top" : "-" + (size/2) + "px", "border-radius" :"20px"});
		
		try{
			ctx = $("#ecplus_loader")[0].getContext('2d');
		
			$("#ecplus_loader_bg").show();
			drawer = setInterval(this.draw, 10);
		}catch(err){}
	}