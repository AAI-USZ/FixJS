function confirmOK()
{
    try
    {
        var giftDate = parseDate($('#giftDateInput').attr('value'));
    
    
        if((selected_eventId > 0) && (giftDate == null)){
            purchaseItem(selected_itemId, selected_eventId, "Event");
        }
        else if((giftDate != null) && (selected_eventId < 0)){
            purchaseItem(selected_itemId, giftDate.toDateString(), "Date");
        }
        else {
            throw "Please select either an event or a date.";
        }
    }catch(e)
    {
        alert(e);
        return;
    }
        
    $('#confirmDialog').dialog('close');
    $('h3[id=' + selected_itemId + ']').addClass('purchased');
}