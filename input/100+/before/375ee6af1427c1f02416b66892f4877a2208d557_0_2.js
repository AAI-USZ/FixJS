function updateBookingProject (form) {
    issue_id = form.time_log_issue_id.value;
    if (issue_id.blank()) {
        form.project_id_select.enable();
    } else {
        new Ajax.Request('/issues/' + issue_id + '.json?',
            {
                method:'get',
                onSuccess:function (transport) {
                    var issue = transport.responseJSON.issue;
                    if (issue == null) {
                        form.project_id_select.enable();
                    } else {
                        form.project_id_select.disable();
                        form.time_log_project_id.value = issue.project.id;
                        select_options = form.project_id_select;
                        for (i = 0; i < select_options.length; i++) {
                            if (select_options[i].value == issue.project.id) select_options[i].selected = true;
                        }
                    }
                }
            });
    }
}