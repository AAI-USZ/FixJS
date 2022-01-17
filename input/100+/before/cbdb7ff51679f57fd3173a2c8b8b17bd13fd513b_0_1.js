function(req, res) {
    var ids = req.body.ids,
        getOthers = function(person, callback) {
            if (person) {
                person.getIdentifiers(callback);
            } else {
                callback(null, []);
            }
        };

    async.map(ids, Person.fromIdentifier, function(err, people) {
        async.map(people, getOthers, function(err, identlist) {
            var i, results = {};
            for (i = 0; i < ids.length; i++) {
                results[ids[i]] = identlist[i];
            }
            res.json(results);
        });
    });
}