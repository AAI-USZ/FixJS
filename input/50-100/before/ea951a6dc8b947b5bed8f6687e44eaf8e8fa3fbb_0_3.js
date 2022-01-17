function recalculate_start_date()
{
    from_milestone = $('milestone_previous_start_date_milestone_id').value;
    offset = $('milestone_start_date_offset').value;
    new Ajax.Request('/milestones/recalculate_start_date',
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