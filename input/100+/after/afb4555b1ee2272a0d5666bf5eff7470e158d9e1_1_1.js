function(display) {
			plotid = 'plot';
			var that = this;
			function makePlotWindow() {
			    if (!that.plotWindow || !that.plotWindow.window || that.plotWindow.window.closed) {
			        that.plotWindow = window.open("/plotWindow/", "", "status=1,width=700,height=500"); }
			}
			
			var unfilled_data = [];
			var target_length = display.length;
			var filled_data_count = 0;
			
			for (var i=0; i<display.length; i++) {
			    if (display[i].binary_fp) { 
			        unfilled_data.push(display[i]);
			    } else {
			        filled_data_count++;
			    }
			}
			
			if (filled_data_count == target_length) { 
			    toPlot=display;
			    makePlotWindow();
			    //this.plotWindow.plottingAPI(display, plotid)  //commented out, was throwing errors; Yee 7/13/12
			};
			
			for (var i=0; i<unfilled_data.length; i++) {
			    var ud = unfilled_data[i];
			    var onFinish = function()  { 
			        filled_data_count++;
			        console.log(filled_data_count);
			        if (filled_data_count == target_length) { 
			            toPlot = display;
			            makePlotWindow();
			            //that.plotWindow.plottingAPI(display, plotid); 
			        };
			    } 
			    this.adapter.getBinaryData(ud, onFinish);
			}
			
			
			//toPlot = this.fill_data(display, {success: function() {this.plotWindow.plottingAPI(toPlot, plotid)}} );
			
			
			//this.plotWindow.plottingAPI(toPlot, plotid)

		}