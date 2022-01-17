function() {
    login = new loginHandler();
    repos = new repoList(GITHUB_BASEURL, GITHUB_ORG);
    converter = new Markdown.getSanitizingConverter();
    repos.update();

    $(window).bind( "hashchange", function(e) {
        if ($.bbq.getState( "repo" )) {
            loadRepo($.bbq.getState("repo"));
            repos.hideList();
        } else {
            repos.showList();
        }
    });

    $(window).trigger( "hashchange" );
}