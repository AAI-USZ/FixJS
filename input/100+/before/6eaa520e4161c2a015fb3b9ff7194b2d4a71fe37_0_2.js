function(){

    checkStorage(false);
    var t_ticketdetail = Handlebars.compile( $('#ticket_detail').html() );

    var parseticketdetail = function (data) {
        if (!data)
        {
            return;
        }

        $("#ticket-response-list").remove();
        $('#ticket_detail_main_page').prepend(t_ticketdetail(data));

        var alert_menu = $("#ticket-detail-more");
        //logic to show only correspondent actions: Transfer, PickUp and Cancel
        console.log("data.TechnicianType = " + data.TechnicianType);
        if (data.TechnicianType == "Queue")
        {
            $("#ticket_response_action", alert_menu).remove();
            $("#ticket_addtime_action", alert_menu).remove();
            $("#ticket_close_action", alert_menu).remove();
        }

        $("#ticketInfo").val(JSON.stringify(data));

    };

    var url = $.url(document.location);

    var ticketid = url.param("id");

    if (ticketid > 0)
        api.ticket_detail({"OrganizationKey": getStorage("organization"),"InstanceKey": getStorage("instance"), "Id" : ticketid},parseticketdetail);
    else
        history.back();

}