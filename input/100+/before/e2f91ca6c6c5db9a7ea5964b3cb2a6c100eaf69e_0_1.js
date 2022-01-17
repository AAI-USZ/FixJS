function (error, issues, members) {

        if (error) {
            console.log('Something went wrong during startup:', error);
            throw error;
        }
        var statuses = issues.map(
            function (x) {
                return x.status;
            }).unique();
        var self = this;
        getListsByStatus(config.trello.boardId, statuses, function (error, lists) {
            self(error, {lists: lists, issues: issues, members: members});
        });
    }