function(req, res, next) {
    console.log("REQUEST", util.inspect(req, false, 4, true));

    res.on("update", function(error, result, more) {
        console.log("UPDATE RESPONSE", error, result, more);
    });

    next();
}