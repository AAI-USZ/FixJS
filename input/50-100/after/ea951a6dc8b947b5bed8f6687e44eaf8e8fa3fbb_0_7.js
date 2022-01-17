function milestone_version_changed(project)
{
    val = $('milestone_version_id').value;
    new Ajax.Request(window.root_path + '/milestones/milestone_version_changed',
        {
            method:'get',
            parameters: {id:val, project_id: project},
            onSuccess: function(transport){
                var response = transport.responseText || "no response text";
                eval(response);
            },
            onFailure: function(){ alert('Something went wrong...') }
        });
}