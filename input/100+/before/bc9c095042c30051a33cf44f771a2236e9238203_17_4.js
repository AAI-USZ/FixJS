function(data) {
            var people = [];
            if (data) {
                for (var i in data.results) {
                    if (data.results.hasOwnProperty(i)) {
                        var displayName = sakai.api.User.getDisplayName(data.results[i]);
                        var dottedName = sakai.api.Util.applyThreeDots(displayName, 100, null, null, true);
                        var tempPerson = {
                            "dottedname": dottedName,
                            "name": sakai.api.User.getDisplayName(data.results[i]),
                            "url": data.results[i].homePath
                        };
                        people.push(tempPerson);
                    }
                }
                renderObj.people = people;
                renderObj.peopletotal = data.total;
                renderResults();
            }
        }