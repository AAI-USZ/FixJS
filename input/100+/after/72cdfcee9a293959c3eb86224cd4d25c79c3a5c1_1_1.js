function (user, repo, number, page, comments, callback) {
    if (typeof page == 'function') {
        callback = page;
        comments = [];
        page     = 1;
    }

    var options = {
        user: user,
        repo: repo,
        page: page,
        number: number,
        per_page: '50'
    };

    github('/repos/:user/:repo/issues/:number/comments', options, function (err, result) {
        if (err) return callback(err);
        comments = comments.concat(result);
        if (result.length === 50) module.exports.getComments(user, repo, number, page + 1, comments, callback);
        else callback(err, comments);
    });
}