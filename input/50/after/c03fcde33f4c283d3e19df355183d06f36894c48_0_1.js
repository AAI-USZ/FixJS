function (user, repo, label, number, callback) {
    github('/repos/:user/:repo/issues/:number/labels', {
        user: user,
        repo: repo,
        label: label,
        number: number,
        method: "POST"
    }, callback);
}