function packageResults(err, result){
                if (err) throw err;

                // TODO: refactor formats to external object
                if (format === 'geojson'){
                    toGeoJSON(result, res, this);
                } else if (format === 'csv'){
                    toCSV(result, res, this);
                } else {
                    var end = new Date().getTime();

                    var json_result = {'time' : (end - start)/1000};

                    if (result.command === 'SELECT') {
                        json_result.total_rows = result.rows.length;
                        json_result.rows = result.rows;
                    } else {
                        json_result.total_rows = result.rowCount;
                    }
                    
                    return json_result;
                }
            }