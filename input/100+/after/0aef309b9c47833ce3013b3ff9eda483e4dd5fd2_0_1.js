function init(args) {
    /* temp strip off port for the ajax domain (which will need it to
     * make a request) */
    var i = (ajax_domain || "").indexOf(':');
    var a = (i < 0) ? ajax_domain : ajax_domain.slice(0, i);
    /* permanently strip it off for the cur_domain which only sets cookies */
    i = (cur_domain || "").indexOf(':');
    cur_domain = (i < 0) ? cur_domain : cur_domain.slice(0, i);

    if(cur_domain != a) {
        global_cookies_allowed = false;
    }
    else if(cnameframe && !logged) {
        var m = Math.random() + '';
        createCookie('test', m);
        global_cookies_allowed = (readCookie('test') == m);
    }
    if (global_cookies_allowed) {
        updateClicks();
        /*updateMods();*/
    }
    stc = $("siteTable_comments");
    /* onload populates reddit_link_info, so checking its contents
     * ensures it doesn't get called on reload/refresh */
    if ( reddit_thing_info.fetch && reddit_thing_info.fetch.length != 0 )
        updateLinks(reddit_thing_info.fetch);
    update_reddit_count();

    /* initiate ajax requests to populate the side bar */
    /*populate_side_bar('side-wikilinks');*/
    /*populate_side_bar('side-wikilinks', 'article_id=2');    */
    populate_side_bar('side-meetups', args);
    populate_side_bar('side-comments', args);
    populate_side_bar('side-posts', args);
    populate_side_bar('side-tags', args);
    populate_side_bar('side-monthly-contributors', args);
    populate_side_bar('side-contributors', args);

    populate_side_bar('front-recent-posts', args);
    populate_side_bar('front-meetups-map', args, 
                      function(response) { 
                        $('front-meetups-map').innerHTML = response.responseText;
                        createMap($('front-map')); 
                      });
}