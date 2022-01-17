function savetopcollcookie(value)
{
    // Only save the cookie if consent has been given or not required for the installations country.
    if (cookieConsent == 2)
    {
        // Use our YUI instance and use the cookie module. 
        if (cookieExpires == null)
        {
            // Session Cookie...
            ourYUI.use('cookie', function(Y){ 
               Y.Cookie.setSub("mdl_cf_topcoll",thecookiesubid,value); 
               //alert("Bongo After " + thecookiesubid + " " + value);
            });
            // Using Sub cookies, so, name, moodleid/courseid, value.
            // This is not a Moodle table but in fact the cookies name.
        }
        else
        {
            // Expiring Cookie...
                ourYUI.use('cookie', function(Y){ 
                var newDate = new Date();
                newDate.setTime(newDate.getTime() + cookieExpires); 
                Y.Cookie.setSub("mdl_cf_topcoll",thecookiesubid,value, { expires: newDate }); 
                //alert("Bongo After " + thecookiesubid + " " + value + " " + newDate + " " + cookieExpires);
            });
            // This is not a Moodle table but in fact the cookies name.
        }
    }
}