function (sessionClient) {
        this.logger.info("Successfully closed session client");
        sessionClient.end();
    }