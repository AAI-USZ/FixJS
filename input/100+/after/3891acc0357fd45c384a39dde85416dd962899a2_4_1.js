function P11LogGraph(output, statusText, jqxhr)
{
	var width = 640;
	var height = 360;
	var padding = 64;
	var primaryColor = jqxhr.color;
	var secondaryColor = "black";
	var alphaHigh = 1.0;
	var alphaLow = 0.2;
	
	var data = output.split(",");
	var graph = document.getElementById("p11LogGraph");
	var dataPoints = document.getElementById("p11LogDataPoints");
	var context = null;

	var setupGraph = function()
	{
		graph.width = width;
		graph.height =  height;

		dataPoints.width = width;
		dataPoints.height = height;
	};

	var clearGraph = function()
	{
		context = graph.getContext("2d");
		context.clearRect(0, 0, context.width, context.height);
		
		context = dataPoints.getContext("2d");
		context.clearRect(0, 0, context.width, context.height);
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
		var title = document.getElementById("p11LogCanvasTitle");
		var xAxis = document.getElementById("p11LogXAxisTitle");
		var yAxis = document.getElementById("p11LogYAxisTitle");

		title.innerHTML = "P11, aerosol only phase function, from 2 ";
		title.innerHTML += "to 176 degrees, by 1 degree, at 532 nm";

		xAxis.innerHTML = "Scattering Angle [degrees]";
		yAxis.innerHTML = "P11 Phase Function [unitless]";
	};

	var drawAxes = function()
	{
		var x, y, text;
		
		context = graph.getContext("2d");

		context.fillStyle = secondaryColor;
		context.strokeStyle = secondaryColor;
		context.font = "bold 11pt sans-serif";
		context.lineWidth = 1;

		for(var i = 0; i <= 9; i++)
		{
			x = width - (padding * 2);
			x = x / 9 * i;
			x = x + padding;

			text = 20 * i;

			context.globalAlpha = alphaHigh;
			context.fillText(text, (x - context.measureText(text).width / 2),
				(height - padding + 20));

			context.globalAlpha = alphaLow;
			context.moveTo(x, (height - padding + 5));
			context.lineTo(x, padding);
		}

		for(var j = 0; j < 4; j++)
		{
			y = height - (padding * 2);
			y = y / 3 * j;
			y = y + padding;

			text = Math.pow(10, (4 - j - 2));

			context.globalAlpha = alphaHigh;
			context.fillText(text,
				(padding - context.measureText(text).width - 10), (y + 3));

			context.globalAlpha = alphaLow;
			context.moveTo((padding - 5), y);
			context.lineTo((width - padding), y);
		}

		context.fill();
		context.stroke();
	};

	var plotPoints = function()
	{
		var x, y, temp, logValue;
		
		context = dataPoints.getContext("2d");

		context.strokeStyle = primaryColor;
		context.fillStyle = primaryColor;
		context.lineWidth = 1;

		for(var i = 6; i < data.length; i++)
		{
			logValue = Math.log(data[i]) - Math.log(0.1);
			logValue /= Math.log(100) - Math.log(0.1);

			x = width - (padding * 2);
			x = (x / 180) * (i - 4);
			x = x + padding;

			y = height - (padding * 2);
			temp = y / 10;
			temp = temp * (logValue * 10);
			y = y - temp;
			y = y + padding;

			if(data[i] >= 0.1 && data[i] <= 100)
			{
				context.moveTo(x, y);
				context.arc(x, y, 1.5, 0, (2*Math.PI), false);
			}
		}

		context.fill();
		context.stroke();
	};
	
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
		plotPoints();
	}
}