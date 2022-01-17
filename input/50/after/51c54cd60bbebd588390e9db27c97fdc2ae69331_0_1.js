function(req, res, params) {
        this.sessions.createSession(req, res, { userId: 9 });
        res.end();
    }