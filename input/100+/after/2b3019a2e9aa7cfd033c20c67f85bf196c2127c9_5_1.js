function(monitoring){
        if (!mustBeAdmin()) return;
        $('#totalGroups', $dashboard).text(monitoring['totalGroups'])
    }