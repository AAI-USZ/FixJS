function() {
        pl('#twitterbanner').html('<a href="https://twitter.com/share" class="twitter-share-button" data-url="' + this.listing_url + '" data-text="' + this.listing_public_title + '" data-via="startupbidder" data-related="startupbidder" data-hashtags="startupbidder">Tweet</a>');
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    }