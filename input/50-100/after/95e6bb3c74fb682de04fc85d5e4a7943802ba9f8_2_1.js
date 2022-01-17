function markConversationAsRead()
{
    $(gSelectedElement).removeClass("unreadconversation");
    $(gSelectedElement).addClass("readconversation");
    app.decrementNrOfUnreadConvs(gSelectedConversationID);
    //call the server to mark the conversation as read
    $.getJSON('Messages/MarkConversationAsRead',
                { conversationId: gSelectedConversationID },
                function (data) {
                   //conversation marked as read
                    console.log(data);
                }
        );
}