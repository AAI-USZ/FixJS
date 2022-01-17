function()
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
	}