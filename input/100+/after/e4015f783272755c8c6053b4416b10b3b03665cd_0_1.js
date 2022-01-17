function(options) {
        var self = this;
        options = options || {};
        var repo = options.repo;
        var limit = options.limit || 10;

        var target = options.target || document.getElementById('issues');
        if (target && target.length) target = target[0];
        var url = self.base + '/repos/' + self.user + '/' + repo;
        url += '/issues?callback=define';
        url += '&sort=' + (options.sort || 'updated');
        url += '&state=' + (options.state || 'open');
        require.async(url, function(issues) {
            issues = issues.data.slice(0, limit);
            if (options.callback) {
                options.callback(issues);
            } else {
                showIssues(target, issues);
            }
        });
    }