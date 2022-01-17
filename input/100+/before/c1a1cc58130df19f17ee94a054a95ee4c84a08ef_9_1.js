function(monitoring){
        // we have the monitoring information and we need to
        // send it somewhere to be plotted

        // Write total VMs
        $('#totalVMs', $dashboard).text(monitoring['totalVMs'])

        // Calculate bandwidth
        // netUsage object is global variable and stores last values of
        // BU, BD and the time they were stored.
        // According to the current values and time, we can calculate
        // how much bandwith we are using.
        // Once done, we update the netUsage object with the new values
        // for the next time.

        var t = ((new Date().getTime()) - netUsage.time) / 1000 //in secs
        var bandwidth_up = monitoring['netUsageBar'][1].data[0][0] - netUsage.up
        bandwidth_up /= t
        var bandwidth_up_str = humanize_size(bandwidth_up) + "b/s" //bytes /sec
        var bandwidth_down = monitoring['netUsageBar'][0].data[0][0] - netUsage.down
        bandwidth_down /= t
        var bandwidth_down_str = humanize_size(bandwidth_down) + "b/s" //bytes /sec

        if (bandwidth_up >= 0)
            $('#bandwidth_up', $dashboard).text(bandwidth_up_str)
        if (bandwidth_down >= 0)
            $('#bandwidth_down', $dashboard).text(bandwidth_down_str)

        netUsage.time = new Date().getTime()
        netUsage.up = monitoring['netUsageBar'][1].data[0][0]
        netUsage.down = monitoring['netUsageBar'][0].data[0][0]

        //if (!$dashboard.is(':visible')) return;

        // plot these two graphs
        var container = $('div#vmStatePie',$dashboard);
        SunstoneMonitoring.plot('VM',
                                'statePie',
                                container,
                                monitoring['statePie']);

        container = $('div#netUsageBar',$dashboard);
        SunstoneMonitoring.plot('VM',
                                'netUsageBar',
                                container,
                                monitoring['netUsageBar']);
    }