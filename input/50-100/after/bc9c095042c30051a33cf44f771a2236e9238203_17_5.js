function(success, data) {
                renderContent($.parseJSON(data.results[0].body));
                renderPeople($.parseJSON(data.results[1].body));
                for (var c = 0; c < templates.length; c++) {
                    renderGroups($.parseJSON(data.results[2 + c].body), templates[c].id);
                }
            }