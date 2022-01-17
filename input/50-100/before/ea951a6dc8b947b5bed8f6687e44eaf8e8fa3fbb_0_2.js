function new_milestone_subproject_selected()
{
    selected = $('milestone_subproject_id').value;
    if (selected == '0')
    {
        selected = $('milestone_project_id').value;
    }
    new Ajax.Request('/milestones/subproject_changed/?id='+selected,
        {
            method:'get',
            onSuccess: function(transport){
                var response = transport.responseText || "";
                eval(response);
            },
            onFailure: function(){ alert('Something went wrong...') }
        });
}