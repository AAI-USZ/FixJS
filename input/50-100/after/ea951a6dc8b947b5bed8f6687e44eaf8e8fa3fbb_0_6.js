function issue_version_changed(project)
{
    val = $('issue_fixed_version_id').value;
    new Ajax.Request(window.root_path + '/milestones/issue_version_changed',
        {
            method:'get',
            parameters: {id: val, project_id: project},
            onSuccess: function(transport){
                var response = transport.responseText || "no response text";
                eval(response);
            },
            onFailure: function(){ alert('Something went wrong...') }
        });
}