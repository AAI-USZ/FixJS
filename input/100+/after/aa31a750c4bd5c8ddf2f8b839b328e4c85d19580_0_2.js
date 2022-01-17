function (event, pos, item) {
        
        var message = "";
        
        if (item) {
            
            //tracking the dataIndex assists with vertical mouse movement across the bars
            //tracking seriesIndex assists with horizontal movement across a bar
            if ((previousPoint !== item.dataIndex) || (previousSeriesIndex !== item.seriesIndex)) {
                
                $("#graph-tooltip").remove();

                previousPoint = item.dataIndex;
                previousSeriesIndex = item.seriesIndex;
                
                message = item.series.data[previousPoint][0] + " total crashes for builds " + previousPoint + " Days old.";
                
                showTooltip(item.pageX - 100, item.pageY - 60, message);
            }
        } else {
            $("#graph-tooltip").remove();
            previousPoint = null;
        }
    }