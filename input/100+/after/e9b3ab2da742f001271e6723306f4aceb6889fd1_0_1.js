function observeParentIssueField(url) {
    jQuery('#issue_parent_issue_id').autocomplete({
        source: function(request, response) {
            jQuery.getJSON(
                url,
                {q: request.term},
                function(data) {
                    response(jQuery.map(data, function(item) {
                        return {
                            label: item.issue.tracker.name + ' #' + item.issue.id + ': ' + item.issue.subject,
                            value: item.issue.id
                        };
                    }));
                }
            );
        }
    });
}