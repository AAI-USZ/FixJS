function packageResults(err, result){
                if (err) throw err;

                // TODO: refactor formats to external object
                if (format === 'geojson'){
                    toGeoJSON(result, res, this);
                } else if (format === 'csv'){
                    toCSV(result, res, this);
                } else {
                    var end = new Date().getTime();
                    return {
                        'time' : ((end - start)/1000),
                        'total_rows': result.rows.length,
                        'rows'      : result.rows
                    };
                }
            }