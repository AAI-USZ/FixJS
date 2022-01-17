function(monitoring){
        $('#totalVMs', $dashboard).text(monitoring['totalVMs'])

        var t = ((new Date().getTime()) - netUsage.time) / 1000 //in secs
        var bandwidth_up = monitoring['netUsageBar'][1].data[0][0] - netUsage.up
        bandwidth_up /= t
        var bandwidth_up_str = humanize_size(bandwidth_up) + "/s" //bytes /sec
        var bandwidth_down = monitoring['netUsageBar'][0].data[0][0] - netUsage.down
        bandwidth_down /= t
        var bandwidth_down_str = humanize_size(bandwidth_down) + "/s" //bytes /sec

        if (bandwidth_up >= 0)
            $('#bandwidth_up', $dashboard).text(bandwidth_up_str)
        if (bandwidth_down >= 0)
            $('#bandwidth_down', $dashboard).text(bandwidth_down_str)

        netUsage.time = new Date().getTime()
        netUsage.up = monitoring['netUsageBar'][1].data[0][0]
        netUsage.down = monitoring['netUsageBar'][0].data[0][0]

        if (!$dashboard.is(':visible')) return;

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