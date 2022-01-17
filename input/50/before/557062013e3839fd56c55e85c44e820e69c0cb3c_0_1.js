function(e) {
        if ($.bbq.getState( "repo" )) {
            loadRepo($.bbq.getState("repo"));
            repos.hideList();
        } else {
            repos.showList();
        }
    }