function (text, kind, target) {
    if(typeof target == 'undefined') {
      target = document;
    }

    var uid = Math.random() * 10000;
    var notificationElemId = 'instaedit-notification-' + parseInt(uid);
    var notificationTextElemId = 'instaedit-notification-text' + parseInt(uid);

    var doc = target.getElementsByTagName('body')[0];

    var notification = target.createElement('div');
    notification.setAttribute('id', notificationElemId);
    doc.appendChild(notification);

    var notification = target.getElementById(notificationElemId);
    notification.innerHTML = '<span id="' + notificationTextElemId + '">' + text + '</span>';

    if(kind != 'error') {
      notification.style.background = "-webkit-linear-gradient(#636363, #030303)";
      notification.style.background = "linear-gradient(#636363, #030303)";
    } else {
      notification.style.background = "-webkit-linear-gradient(#c40505, #840404)";
      notification.style.background = "linear-gradient(#c40505, #a90303)";
    }

    if(text.length > 100) {
      notification.style.width = "400px";
      notification.style.height = parseInt((2/3) * text.length) + "px";
      notification.style.textAlign = "left";
    } else {
      notification.style.width = "300px";
      notification.style.height = "70px";
      notification.style.textAlign = "center";
    }

    notification.style.border = "1px solid #000000";
    notification.style.position = "absolute";
    notification.style.top = "10px";
    notification.style.right = "10px";
    notification.style.borderRadius = "6px";

    var notification_text = target.getElementById(notificationTextElemId);

    if(text.length > 100) {
     notification_text.style.left = '25px'; 
     notification_text.style.right = '25px';
     notification_text.style.paddingRight = '25px'; 
    }

    notification_text.style.color = 'white';
    notification_text.style.position = 'relative';
    notification_text.style.top = '20px';
    notification_text.style.paddingTop = '40px';
    notification_text.style.fontFamily = 'HelveticaNeueBold, HelveticaNeue-Bold, Helvetica Neue Bold, "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosBold", "Helvetica", "Tahoma", "Geneva", "Arial", sans-serif';

    notification_text.style.fontWeight = '600'; 
    notification_text.style.fontStretch = 'normal';

    notification_text.style.textShadow = 'rgba(0,0,0,0.5) -1px 0, rgba(0,0,0,0.3) 0 -1px, rgba(255,255,255,0.5) 0 1px, rgba(0,0,0,0.3) -1px -2px';

    notification_text.style.fontSize = '13px';

    description = notification_text.childNodes.description;
    if(typeof description != 'undefined') {
      description.style.position = 'relative';
      description.style.top = '10px';
      description.style.left = '20px';
      description.style.width = '250px';
    }

    setTimeout(function () {
      notification.style.visibility = 'hidden';
    }, 3000);
}