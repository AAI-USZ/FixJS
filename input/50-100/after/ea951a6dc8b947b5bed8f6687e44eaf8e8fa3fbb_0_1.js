function new_milestone_project_selected()
{
    selected = $('milestone_project_id').value;
    new Ajax.Request(window.root_path + '/milestones/parent_project_changed/?id='+selected,
        {
            method:'get',
            onSuccess: function(transport){
                var response = transport.responseText || "no response text";
                eval(response);
            },
            onFailure: function(){ alert('Something went wrong...') }
        });
}