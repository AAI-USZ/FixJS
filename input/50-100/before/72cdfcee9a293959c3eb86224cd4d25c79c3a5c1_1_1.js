function (err, result) {
        if (err) return callback(err);
        comments = comments.concat(result);
        if (result.length === 50) module.exports.getIssues(user, repo, number, page + 1, comments, callback);
        else callback(err, comments);
    }