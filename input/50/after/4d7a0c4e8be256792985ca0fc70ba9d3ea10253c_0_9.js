function (selector) {
        var active_dbs = $(".databases input[type=checkbox]").not(":disabled");
        if (active_dbs.length === 1) {
            active_dbs.check();
        }
        return active_dbs;
    }