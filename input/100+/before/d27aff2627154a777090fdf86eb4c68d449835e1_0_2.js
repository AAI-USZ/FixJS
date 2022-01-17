function() {

    // show spinner during AJAX requests
    jQuery.ajaxSetup({
        beforeSend: function() {
            $.mobile.showPageLoadingMsg();
        }
    });

    document.addEventListener("deviceready", function() {
        alert("device is ready - traditional)");
    }, false);

    $(document).bind("deviceready", function() {
        alert("device is ready - jquery)");
        navigator.notification.alert("Custom alert", "Custom title", "Yup!");
    });

    // get Data
    fetchData();

    // refresh button/link
    $('#refresh').bind("vclick", function() {
        fetchData();
        return false;
    });

    //  Google Groups
    $('#subscribe').bind("click", function(e) {
        e.stopPropagation();
        var email = $('#emailAddress').val().trim();
        if (email.length === 0) {
            alert("Please enter an email address.");
            e.preventDefault();
            return false;
        }
        if (confirm("Your browser will now be opened and your email will passed to Google Groups.  Please follow confirmation instructions given by Google.")) {
            $(this).attr('href','http://groups.google.com/group/rambo-announce/boxsubscribe?email='+encodeURIComponent(email));
            return true;
        } else {
            e.preventDefault();
            return false;
        }
    });

    // compile templates
    twitterTemplate = Handlebars.compile($("#twitter-result-template").html());
    calendarTemplate = Handlebars.compile($("#calendar-result-template").html());
    rssTemplate = Handlebars.compile($("#rss-result-template").html());
    rssDetailTemplate = Handlebars.compile($("#rss-detail-template").html());
    trailStatusTemplate = Handlebars.compile($("#trail-status-template").html());

    Handlebars.registerHelper('timeAgo', function(dateString) {
        var dateMS = Date.parse(dateString);
        var now =  (new Date()).getTime();
        return getTweetTime(now, dateMS);
    });

}