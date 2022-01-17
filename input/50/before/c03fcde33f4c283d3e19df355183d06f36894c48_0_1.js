function (user, repo, label, number, callback) {
    github('/issues/label/add/:user/:repo/:label/:number', {
        user: user,
        repo: repo,
        label: label,
        number: number,
        method: "POST"
    }, callback);
}