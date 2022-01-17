function(target)
        {

                if (!target)
			return

		var svg = null

		if (target == "catalyst")
		{
			svg = svg_catalyst
		}
	
		if (target == "substrate")
		{
			svg = svg_substrate
		}

                select_mode = ! select_mode;
                move_mode = ! move_mode;

                if(select_mode)
                {
                        svg.select('rect.button8').style('fill', defaultFillColor);
                        svg.select('rect.button9').style('fill', highlightFillColor);
                        addLasso(target);
                }

                if(move_mode)
                {
                        svg.style("cursor", "all-scroll");
                        svg.select('rect.button8').style('fill', highlightFillColor);
                        svg.select('rect.button9').style('fill', defaultFillColor);                        
                        removeLasso(target)
                }
        }