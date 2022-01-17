function recalculate_actual_date(id)
{
    new Ajax.Request('/milestones/recalculate_actual_date',
        {
            method:'get',
            parameters: {id: id},
            onSuccess: function(transport){
                var response = transport.responseText || "no response text";
                eval(response);
            },
            onFailure: function(){ alert('Something went wrong...') }
        });
}