function(params, callback) {
            var yqlTable = 'https://raw.github.com/yql/yql-tables/master/weather/weather.woeid.xml',
            coords = params;

            var query = Y.YQL('use "'+ yqlTable +'" as weather; '+
                    'select * from weather where w in (select place.woeid from flickr.places where '+
                    'lat='+ coords.latitude +' and lon='+ coords.longitude +' and api_key=07518c5da6dcda6f2d8126ca45fbf085)'+
                    ' and u="c";',
                    Y.bind(this.onDataReturn,this,callback));
        }