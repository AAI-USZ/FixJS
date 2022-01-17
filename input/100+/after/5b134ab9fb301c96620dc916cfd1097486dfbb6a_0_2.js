function(parentElement, yAxisWidth, xAxisHeight, channelName, tbounds, yAxisPosition, positiveOnly){
        var component = this;
        this.channelName = channelName;
        this.width = width;
        this.height = height;
        this.tbounds = tbounds;
        this.parent = $(parentElement);

        var dateAxisDivId = this.parent.attr("id") + "_GrapherDateAxis";
        var numberAxisDivId = this.parent.attr("id") + "_GrapherNumberAxis";
        var plotContainerDivId = this.parent.attr("id") + "_GrapherPlotContainer";


        this.dateAxisContainer = $("<div id=\"" + dateAxisDivId + "\"></div>");
        this.numberAxisContainer = $("<div id=\"" + numberAxisDivId + "\"></div>");
        this.plotContainerContainer = $("<div id=\"" + plotContainerDivId + "\"></div>");

        var width = parentElement.width() - yAxisWidth;
        var height = parentElement.height() - xAxisHeight;

        this.dateAxisContainer.css("width",width + "px");
        this.dateAxisContainer.css("height",height + "px");
        this.numberAxisContainer.css("width",width + "px");
        this.numberAxisContainer.css("height",height + "px");
        this.plotContainerContainer.css("width",width + "px");
        this.plotContainerContainer.css("height",height + "px");
        this.plotContainerContainer.css("display","inline-block");

        this.dateAxisContainer.css("left","-" + (width * 2) + "px");
        this.numberAxisContainer.css("left","-" + (width * 2) + "px");

        this.dateAxisContainer.css("position","fixed");
        this.numberAxisContainer.css("position","fixed");


        var yCanvas = $("<canvas width='" + yAxisWidth+ "' height='" + height + "'></canvas>");

        switch (yAxisPosition){
            default:
            case "left":
                this.parent.append(yCanvas);
                this.parent.append(this.plotContainerContainer);
                break;
            case "right":
                this.parent.append(this.plotContainerContainer);
                this.parent.append(yCanvas);
                break;
        }

        this.parent.append(this.dateAxisContainer);
        this.parent.append(this.numberAxisContainer);



        this.xAxis = new DateAxis(this.dateAxisContainer.attr('id'),"horizontal",{min:tbounds.start/1000,max:tbounds.end/1000});
        this.yAxis = new NumberAxis(this.numberAxisContainer.attr('id'),"vertical");

        this.yAxis.canvas = yCanvas;

        this.xAxis.canvas = $("<canvas width='" + width + "' height='" + xAxisHeight + "'></canvas>");
        this.xAxis.canvas.css("position","relative");
        this.xAxis.canvas.css("top","-8px");
        this.parent.append(this.xAxis.canvas);

        this.xAxis.canvas = this.xAxis.canvas[0];
        this.yAxis.canvas = this.yAxis.canvas[0];

        this.xAxis.paint = function(){};
        this.yAxis.paint = function(){};

        this.xAxis.addAxisChangeListener(function(){
            component.xAxis.paint(component.xAxis);
        });

        this.yAxis.addAxisChangeListener(function(){
            component.yAxis.paint(component.yAxis);
        });

        this.xAxis.setPaint = function(paintFunc){
            component.xAxis.paint = paintFunc;
            component.xAxis.paint(component.xAxis);
        };

        this.yAxis.setPaint = function(paintFunc){
            component.yAxis.paint = paintFunc;
            component.yAxis.paint(component.yAxis);
        }



        var periodLocation = channelName.indexOf(".");
        var deviceName = channelName.substring(0,periodLocation);
        var subChannelName = channelName.substring(periodLocation+1);




        BodyTrack.LOGIN.getStatus(function(status){

            component.plot = new DataSeriesPlot(channelDatasource(status.user_id, deviceName, subChannelName),component.xAxis,component.yAxis,grapherStyle);

            var afterload = function(stats){
                if (stats.has_data){
                    var yMax = stats.y_max;
                    var yMin = positiveOnly ? 0 : stats.y_min;
                    var yDiff = yMax - yMin;
                    if(yDiff < 1e-10) {
                        component.yAxis.setRange(yMin - 0.5, yMin + 0.5);
                    } else {
                        var padding = 0.075 * yDiff;
                        component.yAxis.setRange(positiveOnly ? yMin : yMin - padding, yMax + padding);
                    }
                    component.plot.setStyle( component.plot.getStyle()); // Trigger a repaint)
                }
            };

            var fixBounds = function(){
                afterload( component.plot.getStatistics( component.xAxis.getMin(), component.xAxis.getMax(),["has_data", "y_max", "y_min"]));
            }

            //currently there is no better way with the api to get the necessary height
            $.doTimeout(250,fixBounds);


            component.plotContainer = new PlotContainer(component.plotContainerContainer.attr('id'), true,[ component.plot]);

        });



    }