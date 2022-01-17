function(err, feed){

            /**
             * Get the last entry of the feed
            */
            var entry = feed.feed.entry[feed.feed.entry];

            /**
             * If there is an entry, parse the required information
            */
            if(entry && entry.content)
            {
                if(entry.yt$status.$t == "active" || entry.yt$status.$t == "completed"){
                /**
                 * Parse the URL and split it into segments to get the last entity
                */
                var UrlParts = entry.content.src.split("/");

                /**
                 * Create an iframe
                */
                var iframe = document.createElement('iframe');

                /**
                 * Assign the param to the iframe
                */
                iframe.src = 'http://www.youtube.com/embed/' + UrlParts[UrlParts.length-1].split("?")[0];
                iframe.width = width;
                iframe.height = height;
                iframe.setAttribute("frameborder", this.config.playerFrameBorder);
                iframe.setAttribute("allowfullscreen", this.config.allowFullScreen);

                /**
                 * Replace the target node with the iframe node
                */
                target.parentNode.replaceChild(iframe, target);
            }
            }
        }