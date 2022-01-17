function (err, series) {

        

        series.find(spec).toArray(function (err, series) {

            

            return callback(null, series);

            

        });

        

    }