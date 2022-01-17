function()  { 
			        filled_data_count++;
			        console.log(filled_data_count);
			        if (filled_data_count == target_length) { 
			            toPlot = display;
			            makePlotWindow();
			            //that.plotWindow.plottingAPI(display, plotid); 
			        };
			    }