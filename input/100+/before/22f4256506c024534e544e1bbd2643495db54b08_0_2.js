function()
{
	var message = "Loading ...";
	var bdy = $(document.body);
	var size = Math.min(window.innerWidth, window.innerHeight) * 0.6;	
	var drawer = null;
	
	bdy.append("<div id=\"ecplus_loader_bg\" style=\"display:none\"><canvas id=\"ecplus_loader\"width=\""+size+"\" height=\""+size+"\">Loading...</canvas></div>");
	
	var ctx;
	var step = (2 * Math.PI) / 300;
	var i = 0;
	try{
		ctx = $("#ecplus_loader")[0].getContext('2d');
		ctx.translate(size/2, size/2);
		ctx.font = "18pt sans-serif";
	}
	catch(err)
	{
		
	}
	
	
	this.setMessage = function (msg)
	{
		message = msg;
	}
	
	this.start = function()
	{
		size = Math.min(window.innerWidth, window.innerHeight, 800) * 0.4;	
		
		$("#ecplus_loader").css({"width"  : size + "px", "height" : size + "px", "position" : "fixed", "top" : "50%", "left" : "50%", "margin-left" : "-" + (size/2) + "px", "margin-top" : "-" + (size/2) + "px", "border-radius" :"20px"});
		
		try{
			ctx = $("#ecplus_loader")[0].getContext('2d');
		
			$("#ecplus_loader_bg").show();
			drawer = setInterval(this.draw, 10);
		}catch(err){}
	}
	
	this.draw = function()
	{
		if(!ctx) return;
		
		var d = size;
		var halfd = d/2;
		ctx.clearRect(-halfd, -halfd, d, d);
		ctx.save();
		ctx.beginPath();
		
		var ts = ctx.measureText(message).width;
		ctx.fillText(message, -ts/2, 0);
		ctx.rotate(step * (++i % 300));
		
		ctx.lineWidth = 5;
		
		var tts = ts * 0.8;
		ctx.arc(0, 0, tts, 0, Math.PI * 0.5);
		ctx.stroke();
		
		ctx.beginPath()
		ctx.arc(0, 0, tts, Math.PI, Math.PI * 1.5);
		ctx.stroke();
		
		ctx.beginPath()
		ctx.strokeStyle = "rgba(255,255,255,1)";
		ctx.lineWidth = 10;
		ctx.arc(0, -10, tts, 0, Math.PI * 0.5);
		ctx.stroke();
		
		ctx.beginPath()
		ctx.lineWidth = 10;
		ctx.arc(0, 10, tts, Math.PI, Math.PI * 1.5);
		ctx.stroke();
		
		ctx.restore();
	}
	
	this.stop = function()
	{
		clearInterval(drawer);
		$("#ecplus_loader_bg").hide();
	}
	
}