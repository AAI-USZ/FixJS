function(monitoring){
        $('#totalUsers', $dashboard).text(monitoring['totalUsers'])

        //if (!$dashboard.is(':visible')) return;

        var container = $('div#usersPerGroup',$dashboard);
        SunstoneMonitoring.plot('USER',
                                'usersPerGroup',
                                container,
                                monitoring['usersPerGroup']);
    }