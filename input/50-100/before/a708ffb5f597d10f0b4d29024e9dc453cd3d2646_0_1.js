function(resource,plotID,container,series){
        var config = SunstoneMonitoringConfig[resource].monitor[plotID]
        var options = config.plotOptions
        $.plot(container,series,options)
    }