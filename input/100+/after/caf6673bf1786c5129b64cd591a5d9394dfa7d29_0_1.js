function() {
        var twitterurl = 'https://twitter.com/share?url=' + encodeURIComponent(this.listing_url) + '&text=' + encodeURIComponent(this.listing_public_title);
        pl('#twitterbanner a').attr({
            href: twitterurl,
            'data-url': this.listing_url,
            'data-text': this.listing_public_title
        });
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    }