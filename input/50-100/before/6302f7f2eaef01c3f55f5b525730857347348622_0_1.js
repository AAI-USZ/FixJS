function(q) {
                    var data = Y.YUIDoc.meta[self.get('queryType')],
                        out = [];
                    Y.each(data, function(v) {
                        if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                            out.push(v);
                        }
                    });
                    return out;
                }