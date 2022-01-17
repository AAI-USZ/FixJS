function(monitoring){
        //plot only when i am admin
        if (!mustBeAdmin()) return;

        //plot the number of total users
        $('#totalUsers', $dashboard).text(monitoring['totalUsers'])

        //if (!$dashboard.is(':visible')) return;

        //plot users per group
        var container = $('div#usersPerGroup',$dashboard);
        SunstoneMonitoring.plot('USER',
                                'usersPerGroup',
                                container,
                                monitoring['usersPerGroup']);
    }