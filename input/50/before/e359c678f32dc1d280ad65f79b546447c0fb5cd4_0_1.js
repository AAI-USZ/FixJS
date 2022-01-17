function (session) {
        this.logger.info("Successfully closed session");
        session.end();
    }