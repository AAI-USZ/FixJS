function P11Graph(output)
{
	var width = 640;
	var height = 360;
	var padding = 64;
	var primaryColor = "red";
	var secondaryColor = "black";
	var alphaHigh = 1.0;
	var alphaLow = 0.2;
	
	var data = output.split(",");
	var graph = document.getElementById("p11Graph");
	var dataPoints = document.getElementById("p11DataPoints");
	var context = null;
	
	var setupGraph = function()
	{
		graph.width = width;
		graph.height = height;
		
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
	
		context.moveTo(padding, (height / 2));
		context.lineTo((width - padding), (height / 2));
	
		context.fill();
		context.stroke();
	};
	
	var updateTitle = function()
	{
		var title = document.getElementById("p11CanvasTitle");
		var xAxis = document.getElementById("p11XAxisTitle");
		var yAxis = document.getElementById("p11YAxisTitle");

		title.innerHTML = "P11, aerosol only phase function, from 2 ";
		title.innerHTML += "to 176 degrees, by 1 degree, at 532 nm";
		
		
		xAxis.innerHTML = "Scattering Angle [degrees]";
		yAxis.innerHTML = "P11 Phase Function [unitless]";
	};
	
	var drawAxes = function()
	{
		var x, y, temp, text;
		
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
			context.moveTo(x, (height - padding));
			context.lineTo(x, padding);
		}
		
		y = height / 2;
		
		context.globalAlpha = alphaHigh;
		context.fillText("0", (padding - context.measureText("0").width - 10),
			(y + 2));
		
		for(var i = 0; i < 5; i++)
		{
			temp = (y - padding) / 5;
			temp = temp * i;

			temp = temp + padding;
			
			text = 5 - i;
			
			context.globalAlpha = alphaHigh;
			context.fillText(text,
				(padding - context.measureText(text).width - 10), temp);
			
			context.globalAlpha = alphaLow;
			context.moveTo((padding - 5), temp);
			context.lineTo((width - padding), temp);
			
			temp = y;
			temp = temp + ((y - padding) / 5) * (i + 1);
			
			text = (i + 1) * -1;
			
			context.globalAlpha = alphaHigh;
			context.fillText(text,
				(padding - context.measureText(text).width - 10), temp);
			
			context.globalAlpha = alphaLow;
			context.moveTo((padding - 5), temp);
			context.lineTo((width - padding), temp);
		}
		
		context.fill();
		context.stroke();
	};
	
	var plotPoints = function()
	{
		var x, y, temp;
		
		context = dataPoints.getContext("2d");
	
		context.strokeStyle = primaryColor;
		context.fillStyle = primaryColor;
		context.lineWidth = 1;
		
		for(var i = 6; i < data.length; i++)
		{
			if(data[i] <= 5 && data[i] >= -5)
			{
				x = width - (padding * 2);
				x = x / 180 * (i - 4);
				x = x + padding;
				
				y = height / 2;
				
				temp = (y - padding) / 5 * Math.abs(data[i]);
				
				if(data[i] > 0)
				{
					y = y - temp;
				}
				else if(data[i] < 0)
				{
					y = y + temp;
				}
				
				context.moveTo(x, y);
				context.arc(x, y, 1.5, 0, (2*Math.PI), false);
			}
		}
		
		context.fill();
		context.stroke();
	};
	
	setupGraph();
	clearGraph();
	drawBorder();
	updateTitle();
	drawAxes();
	plotPoints();
}