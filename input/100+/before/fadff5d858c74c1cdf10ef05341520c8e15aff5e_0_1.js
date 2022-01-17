function () {
    // Show JS-objects and hide non JS objects
    $('.js').show();
    $('.nojs').hide();

    // Keep session
    $('#content').everyTime(300000, function(){
        $.get('/ping');
    });

    // Initialize counter
    messageEventListener();
    $('#message').change(messageEventListener);
    $('#message').keyup(messageEventListener);

    // Init twitter widget
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
}