function() {
        console.log('#my_statuses');

        var my_statuses = new MyStatuses();
        var view = new SimpleStatusesView({
            collection: my_statuses
        });
        this.changePage(view);

        url = "https://api.weibo.com/2/statuses/user_timeline.json";
        myData = {
            access_token: user.get("token"),
            page: 1,
            count: 20
        };
        my_statuses.fetch({
            url: url,
            data: myData,
            success: function(response) {
                view.$('ul[data-role="listview"]').listview('refresh');
            }
        });
    }