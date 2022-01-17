function (err, data, meta) {
            this.twitts = true;
            this.mojitProxy.render({results: data}, 'twitter', function (err, str) {
                Y.one('.info').append(str);
            });

        }