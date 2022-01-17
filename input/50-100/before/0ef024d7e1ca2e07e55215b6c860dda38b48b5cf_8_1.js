function(monitoring){
        $('#totalHosts', $dashboard).text(monitoring['totalHosts'])
        delete monitoring['totalHosts']

        if (!$dashboard.is(':visible')) return;

        for (plotID in monitoring){
            var container = $('div#'+plotID,$dashboard);
            if (!container.length) continue;
            SunstoneMonitoring.plot("HOST",
                                    plotID,
                                    container,
                                    monitoring[plotID]);
        };
    }