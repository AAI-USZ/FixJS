function()
        {
                select_mode = ! select_mode;
                move_mode = ! move_mode;

                if(select_mode)
                {
                        svg_substrate.select('rect.button8').style('fill', 'lightgray');
                        svg_substrate.select('rect.button9').style('fill', 'red');
                        addLasso("substrate");
                        addLasso("catalyst");                        
                }

                if(move_mode)
                {
                        svg_substrate.style("cursor", "all-scroll");
                        svg_substrate.select('rect.button8').style('fill', 'red');
                        svg_substrate.select('rect.button9').style('fill', 'lightgray');                        
                        svg_substrate.on("mouseup", null);
		        svg_substrate.on("mousedown", null);
		        svg_substrate.on("mousemove", null);
                }
        }