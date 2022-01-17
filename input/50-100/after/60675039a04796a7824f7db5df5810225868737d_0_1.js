function (e) {
            e.halt();
            var city = Y.one('#placeName').get('text'),
                params = {
                    url: {
                        query: city
                }
            };
            if (!this.twitts) {
                this.mojitProxy.invoke('twitter', {params: params}, Y.bind(this.renderTweets, this) );
            }
        }