function() {
    statistics_level = JSON.parse(sync_get('/overview')).statistics_level;
    var user = JSON.parse(sync_get('/whoami'));
    replace_content('login', '<p>User: <b>' + user.name + '</b></p>');
    user_administrator = user.administrator;
    setup_constant_events();
    update_vhosts();
    app.run();
    set_timer_interval(5000);
    var url = this.location.toString();
    if (url.indexOf('#') == -1) {
        this.location = url + '#/';
    }
}