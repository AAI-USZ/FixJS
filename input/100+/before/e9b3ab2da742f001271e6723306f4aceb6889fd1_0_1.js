function observeParentIssueField(url) {
  new Ajax.Autocompleter('issue_parent_issue_id',
                         'parent_issue_candidates',
                         url,
                         { minChars: 1,
                           frequency: 0.5,
                           paramName: 'q',
                           updateElement: function(value) {
                             document.getElementById('issue_parent_issue_id').value = value.id;
                           }});
}