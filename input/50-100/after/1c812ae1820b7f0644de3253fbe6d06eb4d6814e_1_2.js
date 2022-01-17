function (spec, callback) {

    

    this.db.collection('series', function (err, series) {

        

        series.find(spec, { limit: 10, sort: { _id: -1 }}).toArray(function (err, series) {

            

            return callback(null, series);

            

        });

        

    });

    

}