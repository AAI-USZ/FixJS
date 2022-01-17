function (error) {
            if (LOGGER.isError) {
                LOGGER.error.apply(LOGGER, arguments);
            }
        }