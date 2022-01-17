function AltGraph(output, statusText, jqxhr)
{
	var width = 640;
	var height = 360;
	var padding = 64;
	var primaryColor = jqxhr.color;
	var secondaryColor = "black";
	var alphaHigh = 1.0;
	var alphaLow = 0.2;
	var largestY = 30; // must be easily divisible by number_of_ticks
	var number_of_ticks = 6;
	var minTime = jqxhr.minTime;
	var maxTime = minTime + 9;

	var data = output.split(",");
	var graph = document.getElementById("altGraph");
	var dataPoints = document.getElementById("altDataPoints");
	var timeLine = document.getElementById("altTimeLine");
	var context = null;
	
	var setupGraph = function()
	{
		graph.width = width;
		graph.height = height;
		
		dataPoints.width = width;
		dataPoints.height = height;
		
		timeLine.width = 2;
		timeLine.height = height - (padding * 2);
		timeLine.style.top = padding + "px";
		
		timeLine.getContext("2d").globalAlpha = 0.5;
		timeLine.getContext("2d").fillStyle = "red";
		timeLine.getContext("2d").fillRect(0, 0, timeLine.width,
			timeLine.height);
	};
	
	var clearGraph = function()
	{
		context = graph.getContext("2d");
		context.clearRect(0, 0, context.width, context.height);
		
		context = dataPoints.getContext("2d");
		context.clearRect(0, 0, context.width, context.height);
		
		timeLine.style.left = padding + "px";
	};
	
	var drawBorder = function()
	{
		context = graph.getContext("2d");
	
		context.strokeStyle = secondaryColor;
		context.fillStyle = secondaryColor;
		context.lineWidth = 2;
	
		context.moveTo(padding, padding);
		context.lineTo(padding, (height - padding));
	
		context.moveTo(padding, (height - padding));
		context.lineTo((width - padding), (height - padding));
	
		context.fill();
		context.stroke();
	};
	
	var updateTitle = function()
	{
		var title = document.getElementById("altCanvasTitle");
		var xAxis = document.getElementById("altXAxisTitle");
		var yAxis = document.getElementById("altYAxisTitle");

		title.innerHTML = "GPS Altitude";
		xAxis.innerHTML = "Time From Previous Midnight UTC [sec]";
		yAxis.innerHTML = "Altitude [feet]";
	};
	
	var drawAxes = function()
	{
		var x, y, text;
		
		context = graph.getContext("2d");
		
		context.fillStyle = secondaryColor;
		context.strokeStyle = secondaryColor;
		context.font = "bold 11pt sans-serif";
		context.lineWidth = 1;
		
		for(var i = 0; i < 11; i++)
		{
			x = width - (padding * 2);
			x = x / 10 * i;
			x = x + padding;
			
			text = parseInt(minTime + (1 * i)) + "k";
			
			context.globalAlpha = alphaHigh;
			context.fillText(text, (x - context.measureText(text).width / 2),
				(height - padding + 20));
			
			context.globalAlpha = 0.6;
			text = secondsToCalendarHHMM(parseInt(minTime + (1 * i)) * 1000);
			context.fillText(text, (x - context.measureText(text).width / 2),
				(height - padding + 35));
		
			context.globalAlpha = alphaLow;
			context.moveTo(x, (height - padding + 5));
			context.lineTo(x, padding);
		}
		
		for(i = 0; i < 7; i++)
		{
			y = height - (padding * 2);
			y = y / number_of_ticks * i;
			y = y + padding;
			
			text = largestY - (i * (largestY/number_of_ticks)) + "k";
			
			context.globalAlpha = alphaHigh;
			context.fillText(text,
				(padding - context.measureText(text).width - 10), (y + 4));
			
			context.globalAlpha = alphaLow;
			context.moveTo((padding - 5), y);
			context.lineTo((width - padding), y);
		}
		
		context.fill();
		context.stroke();
	};
	
	var setTimeLine = function()
	{
		var x;
		var times = document.getElementById("timeSelect");
		
		x = width - (padding * 2);
		x = x / ((maxTime - minTime + 1) * 1000) *
			(times.options[0].text - (minTime * 1000));
		x = x + padding;
		
		timeLine.style.left = x + "px";
	};
	
	var plotPoints = function()
	{
		var x, y;
		var times = document.getElementById("timeSelect");
		
		context = dataPoints.getContext("2d");
		
		context.strokeStyle = primaryColor;
		context.fillStyle = primaryColor;
		context.lineWidth = 1;
		
		for(var i = 0; i < data.length-1; i++)
		{
			x = width - (padding * 2);
			x = x / ((maxTime - minTime + 1) * 1000) *
				(times.options[i].text - (minTime * 1000));
			x = x + padding;
		
			y = height - (padding * 2);
			y = y / ((largestY * 1000) + 10) * ((largestY * 1000) - data[i]);
			y = y + padding;
		
			context.moveTo(x, y);
			context.arc(x, y, 1.5, 0, (2*Math.PI), false);
		}
		
		context.fill();
		context.stroke();
	}
	
	if(data[0][0] === "!") {
		errorMessage(data[0].substr(1));
	}
	else if(data[0][0] === "@") {
		warningMessage(data[0].substr(1));
	}
	else {
		setupGraph();
		clearGraph();
		drawBorder();
		updateTitle();
		drawAxes();
		setTimeLine();
		plotPoints();
	}
}