function(params, callback) {
            var defaultCoords = {
                latitude: 37.4142716,
                longitude: -122.0243208
            },
            yqlTable = 'https://raw.github.com/yql/yql-tables/master/weather/weather.woeid.xml',
            coords = defaultCoords;

            var query = Y.YQL('use "'+ yqlTable +'" as weather; '+
                    'select * from weather where w in (select place.woeid from flickr.places where '+
                    'lat='+ coords.latitude +' and lon='+ coords.longitude +' and api_key=07518c5da6dcda6f2d8126ca45fbf085)'+
                    ' and u="c";',
                    Y.bind(this.onDataReturn,this,callback));
        }