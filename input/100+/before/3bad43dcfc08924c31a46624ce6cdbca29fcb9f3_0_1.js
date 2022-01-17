function(option, data){
    var friends
        , friends_data
        , sub_account
        , reload
        , user_id
        , diff
        , status;

    if (data.list_ids !== app.data.if_modified_lists) {
        option.reset = true;
    }

    if (option.reset) {
        app.fireEvent('clear');
    }

    app.fireEvent('receiveToken', data.token);

    app.data.sign = data.sign;
    app.data.state = data.account.state;
    app.data.sub_accounts = data.sub_accounts;
    app.data.users = data.users;
    app.data.if_modified_lists = data.list_ids;

    app.fireEvent('receiveSign', app.data.sign);

    if (data.notice) {
        app.fireEvent('notice', data.notice);
    }

    if (data.invite) {
        app.fireEvent('receiveInvite', data.invite);
    }

    if (!('mute' in app.data.state)) {
        app.data.state.mute = {};
    }
    if (!('tags' in app.data.state)) {
        app.data.state.tags = {};
    }
    if (!('star' in app.data.state)) {
        app.data.state.star = {};
    }

    for (var i = 0, max_i = data.sub_accounts.length; i < max_i; i++) {
        app.fireEvent('registerSubAccount', data.sub_accounts[i]);
    }

    data.lists.sort(function(a, b){
        return app.data.state.sort.list[a.id] - app.data.state.sort.list[b.id];
    });

    app.state.animation = false;

    var tasks = 0;
    $.each(data.lists, function(i, list){
        if (list.actioned_on > app.data.if_modified_since) {
            app.data.if_modified_since = list.actioned_on;
        }
        app.fireEvent('registerList', list);
        $.each(list.tasks, function(i, task){
            tasks++;
            app.fireEvent('registerTask', task, list);
        });
    });

    app.state.animation = true;

    if (option.setup && !tasks) {
        setTimeout(function(){
            app.dom.show(app.dom.get('showable', 'welcome'));
        }, 600);
    }

    if (option.setup || option.reset) {
        app.util.sortTaskView('due_epoch', false);
    }

    if (option.task_id in app.data.task_map) {
        app.fireEvent('openTaskInHome', app.data.task_map[option.task_id]);
    }

    app.fireEvent('receiveMe', data);
}