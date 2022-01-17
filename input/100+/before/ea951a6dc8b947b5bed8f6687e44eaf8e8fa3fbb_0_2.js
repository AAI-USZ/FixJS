function start_date_changed(version_id, milestone_id, old_val)
{
    var new_val = $('milestone_start_date').value;

    if ((milestone_id == '') || (milestone_id == 'undefined'))
    {
        milestone_id = -1;
    }

    if ((new_val != undefined && new_val != old_val) && (version_id != '') && (version_id != 0))
    {
        new Ajax.Request('/milestones/'+milestone_id+'/start_date_changed',
            {
                method:'get',
                parameters: {newval: new_val, oldval: old_val, version_id: version_id},
                onSuccess: function(transport){
                    var response = transport.responseText || "no response text";
                    //eval(response);
                },
                onFailure: function(){ alert('Something went wrong...') }
            });
    }
    return true;
}