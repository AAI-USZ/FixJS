function (title, text, type, errorText) {
    // icon types: info,error,success
    if(type == "error"){

        if(errorText != null && errorText != undefined){
            text = text + '<br /><br /><textarea style="width:300px; height:100px; font-size:11px;">' + strip_tags(errorText) + "</textarea>";
        }
        Ext.MessageBox.show({
            title:title,
            msg: text,
            buttons: Ext.Msg.OK ,
            icon: Ext.MessageBox.ERROR
        });
    } else {
        var notification = new Ext.ux.Notification({
            iconCls: 'icon_notification_' + type,
            title: title,
            html: text,
            autoDestroy: true,
            hideDelay:  1000
        });
        notification.show(document);
    }

}