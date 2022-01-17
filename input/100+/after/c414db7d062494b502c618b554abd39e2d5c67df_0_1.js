function(resource, list){
        // Runs the monitoring operation for each monitor object option
        // on the list of resources that comes as parameter.
        // Forms the monitoring object with the results and calls
        // the plotting function (defined in config).
        if (!SunstoneMonitoringConfig[resource])
            return false

        var monConfigs = SunstoneMonitoringConfig[resource].monitor
        var monitoring = {}
        for (conf in monConfigs){ //for each of the things we want to monitor
            var conf_obj = monConfigs[conf]
            var plotID = conf
            var series = conf_obj.operation(resource, list, conf_obj)
            monitoring[plotID]=series
        }

        SunstoneMonitoringConfig[resource].plot(monitoring)
    }