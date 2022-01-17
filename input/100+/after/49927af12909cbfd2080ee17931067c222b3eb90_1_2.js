function MoveCursor(x, y, note)
	{
		var xbis = x - 60;
		if (note._fret_technical != null)
			{
				if (note._fret_technical.length == 2)
					{
						xbis += 5;
					}
				else
					{
						 xbis += 2;
					}
			}

		$($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr({"y": y - 10});
		$($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).animate({svgTransform: 'translate(' + xbis + ' 0)'}, 0, 'linear');
	}