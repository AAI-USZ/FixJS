function(resource,plotID,container,series){
        var config = SunstoneMonitoringConfig[resource].monitor[plotID]
        var options = config.plotOptions

        if (!series.length){
            $(container).unbind();
            $(container).text(tr("No monitoring information available"));
        }
        else {
            $.plot(container,series,options)
        }
    }