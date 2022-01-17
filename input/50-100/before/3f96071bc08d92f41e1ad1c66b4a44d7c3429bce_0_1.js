function(login_url) {
        // pl('#topheaderline').html('Want to raise money for startups or invest in one? <a href="/about-page.html" class="topheaderlink hoverlink">We&rsquo;ll tell you how!</a>');
        pl('#posttext').html('Login to Post');
        if (login_url) {
            pl('#postlink').attr({href: login_url});
            pl('#loginlink').attr({href: login_url});
        }
        pl('#headernotloggedin').show();
    }