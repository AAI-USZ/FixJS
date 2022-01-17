function () {
            var city = Y.one('#placeName').get('text'),
                params = {
                    url: {
                        query: city
                }
            };

            this.mojitProxy.invoke('twitter', {params: params}, Y.bind(this.renderTweets, this) );
        }