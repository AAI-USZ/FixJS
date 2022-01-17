function(beforeExit) {
    var db = new sqlite3.Database(':memory:');

    var retrieved = false;

    var numbers = [
        4294967296.249,
        Math.PI,
        3924729304762836.5,
        new Date().valueOf(),
        912667.394828365,
        2.3948728634826374e+83,
        9.293476892934982e+300,
        Infinity,
        -9.293476892934982e+300,
        -2.3948728634826374e+83,
        -Infinity
    ];

    db.serialize(function() {
        db.run("CREATE TABLE foo (id INT, num FLOAT)");

        var stmt = db.prepare("INSERT INTO foo VALUES(?, ?)");
        for (var i = 0; i < numbers.length; i++) {
            stmt.run(i, numbers[i]);
        }
        stmt.finalize();

        db.all("SELECT num FROM foo ORDER BY id", function(err, rows) {
            if (err) throw err;

            for (var i = 0; i < rows.length; i++) {
                assert.equal(numbers[i], rows[i].num);
            }

            retrieved = true;
        })
    });

    beforeExit(function() {
        assert.ok(retrieved);
    });
}