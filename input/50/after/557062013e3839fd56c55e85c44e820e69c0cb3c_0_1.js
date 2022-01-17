function(e) {
        if ($.bbq.getState("repo")) {
            repos.hideList();
        } else {
            $("#nextRepoPage").hide();
            repos.showList();
        }
    }