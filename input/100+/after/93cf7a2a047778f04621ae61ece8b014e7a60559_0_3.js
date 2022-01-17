function() {
                var url = url_host + url_path_prefix + '/graphlot/?';
                params = build_when();
                for (series in graph_lines) {
                    if (metric_yaxis[series] == "two") {
                        params.push('y2target=' + series);
                    } else {
                        params.push('target=' + series);
                    }
                }
                events = wrap.find(id('eventdesc', graph)).val();
                if (events != "") {
                    params.push('events=' + events);
                }

                return url + params.join("&");
            }