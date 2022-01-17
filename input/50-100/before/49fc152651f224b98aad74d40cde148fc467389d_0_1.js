function () {
            var key = $(this).attr("name");
            if (key && that.datasets[key]) {
                if (key == 'hr') {
                    //that.datasets[key]['constraints'] = that.hrconstraints;
                    //
                  that.datasets[key]['threshold']= that.newhrconstraints;
                }
                else if (key == 'altitude') {
                    //that.datasets[key]['constraints'] = segmentconstraints;

                }

                if (key != 'lon' && key != 'lat') { // lon and lat doesn't go in the graph
                    data.push(that.datasets[key]);
                }
            }
        }