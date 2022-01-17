function (error, lists) {
            self(error, {lists: lists, issues: uniqueIssues, members: members});
        }