function() {
            $(listViewClass).hide();
            $(detailViewClass).hide();
            $(window).trigger("initialize.sendmessage.sakai", [null, $inbox_new_message_sendmessage, sendMessageFinished]);
            $inbox_box_title.text(sakai.api.i18n.getValueForKey("NEW_MESSAGE", "inbox"));
            $(newMessageViewClass).show();
        }