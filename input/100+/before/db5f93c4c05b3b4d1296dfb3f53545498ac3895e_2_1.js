function(data) {
                var prop;
                if (data.type == 'source') {
                    data = data.items;
                    prop = 'source';
                }
                else if (data.type == 'title') {
                    data = data.items;
                    prop = 'title';
                }
                else {
                    data = data.tags;
                    prop = 'tagname';
                }

                return $.map(data, function(row) {
                    return {
                        data: row[prop],
                        value: row[prop],
                        result: row[prop]
                    };
                });
            }