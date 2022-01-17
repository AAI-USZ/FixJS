function(req, res, params) {
        session.createSession(req, res, { userId: 9 });
        res.end();
    }