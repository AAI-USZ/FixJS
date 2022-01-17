function (data) {
        if (!data)
        {
            return;
        }

        //$("#ticket-response-list").remove();
        //$('#ticket_detail_main_page').prepend(t_ticketdetail_head(data));
        $(".ticket_detail_header").append(t_ticketdetail_head(data));
        $(".ticket-det-subject").append(t_ticketdetail_subject(data));
        $('ul#ticketLogList').empty();
        $('ul#ticketLogList').append(t_ticketdetail_logs(data));

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
    }