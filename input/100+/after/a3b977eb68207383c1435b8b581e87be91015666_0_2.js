function (event, pos, item) {
        
        var message = "";
        
        if (item) {
            
            //tracking the dataIndex assists with vertical mouse movement across the bars
            //tracking seriesIndex assists with horizontal movemnt across a bar
            if ((previousPoint !== item.dataIndex) || (previousSeriesIndex !== item.seriesIndex)) {
                
                $(".loading").remove();
            
                previousPoint = item.dataIndex;
                previousSeriesIndex = item.seriesIndex;
                
                message = item.series.data[previousPoint][0] + " total crashes for builds " + item.series.label + " old.";
                
                showTooltip(item.pageX, item.pageY, message);
            }
        } else {
            $(".loading").remove();
            previousPoint = null;
        }
    }