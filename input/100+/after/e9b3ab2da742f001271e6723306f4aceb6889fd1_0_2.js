function observeRelatedIssueField(url) {
    jQuery('#relation_issue_to_id').autocomplete({
        source: function(request, response) {
            jQuery.getJSON(
                url,
                {
                    q: request.term,
                    scope: 'all'
                },
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