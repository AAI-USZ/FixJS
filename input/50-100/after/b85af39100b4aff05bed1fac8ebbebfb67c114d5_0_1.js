function notify_txt(icon, title, body)
{
    // Si l'utilisateur a demandé à ne pas avoir de notifications, on part
    if(localStorage["notifCheck"] != 1)
        return;

    // On affiche la notification
    var notification = webkitNotifications.createNotification(icon, title, body);
    notification.show();

    // On attend le temps indiqué avant de fermer la notification
    setTimeout(function()
    {
        notification.cancel();
    }, localStorage["notifDelay"] * 1000);
}