function recalculate_planned_end_date()
{
    from_milestone = $('milestone_previous_planned_end_date_milestone_id').value;
    offset = $('milestone_planned_end_date_offset').value;
    new Ajax.Request('/milestones/recalculate_planned_end_date',
        {
            method:'post',
            parameters: {
                from: from_milestone,
                offset: offset
            },
            onSuccess: function(transport){
                var response = transport.responseText || "no response text";
                eval(response);
            },
            onFailure: function(){ alert('Something went wrong...') }
        });
}