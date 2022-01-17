function (data) {

    // Notifikationräknare
    if ( data.hasOwnProperty('notification_count') ) {
        $('#notification-counter').html("("+ data.notification_count +")");
        window.parent.document.title = "("+ data.notification_count +")";
    };

    // Notifikation annonserare
    if ( data.hasOwnProperty('notification_message') ) {
        $.jGrowl(data.notification_message);
    };
}