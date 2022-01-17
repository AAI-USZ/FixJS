function (error, issues, members) {
        var uniqueIssues = issues.unique('id');

        if (error) {
            console.log('Something went wrong during startup:', error);
            throw error;
        }
        var statuses = uniqueIssues.map(
            function (x) {
                return x.status;
            }).unique();
        var self = this;
        getListsByStatus(config.trello.boardId, statuses, function (error, lists) {
            self(error, {lists: lists, issues: uniqueIssues, members: members});
        });
    }